import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth-form/auth-form.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import * as ProfileEditActions from '../../profile-edit/store/profile-edit.actions';
import { ProfileEditClear } from '../../profile-edit/store/profile-edit.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string,
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate,
        redirect: true,
    });
};
const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
};
@Injectable()
export class AuthEffects {
    @Effect()
    authSignup$ = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http
                .post<AuthResponseData>(
                    `${environment.urlAuthConfig.singUP}${environment.firebaseConfig.apiKey}`,
                    {
                        email: signupAction.payload.email,
                        password: signupAction.payload.password,
                        returnSecureToken: true,
                    },
                )
                .pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(
                            +resData.expiresIn * 1000,
                        );
                        this.db
                            .collection('Users')
                            .doc(resData.localId)
                            .set({ email: resData.email });
                    }),

                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken,
                        );
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    }),
                );
        }),
    );
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseData>(
                    `${environment.urlAuthConfig.signIn}${environment.firebaseConfig.apiKey}`,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true,
                    },
                )
                .pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(
                            +resData.expiresIn * 1000,
                        );
                    }),
                    map(resData => {
                        return handleAuthentication(
                            +resData.expiresIn,
                            resData.email,
                            resData.localId,
                            resData.idToken,
                        );
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    }),
                );
        }),
    );
    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.zone.run(() => {
                    this.router.navigate(['userPage']);
                });
            }
        }),
    );
    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                token: string;
                tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData.token,
                new Date(userData.tokenExpirationDate),
            );
            if (loadedUser.authToken) {
                const expirationDuration =
                    new Date(userData.tokenExpirationDate).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.authToken,
                    expirationDate: new Date(userData.tokenExpirationDate),
                    redirect: false,
                });
            }
            return { type: 'DUMMY' };
        }),
    );

    @Effect()
    signInGoogle$ = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.LOGIN_WITH_GOOGLE),
        switchMap((authData: AuthActions.LoginWithGoogle) => {
            return from(
                this.firebaseAuth.auth.signInWithPopup(
                    new firebase.auth.GoogleAuthProvider(),
                ),
            ).pipe(
                map(resData => {
                    this.db
                        .collection('Users')
                        .doc(resData.user.uid)
                        .set({ email: resData.user.email }, { merge: true });
                    return handleAuthentication(
                        3600,
                        resData.user.email,
                        resData.user.uid,
                        (resData as any).credential.idToken,
                    );
                }),
                catchError(err => {
                    return handleError(
                        'An error occurred when login using Google!',
                    );
                }),
            );
        }),
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.AuthTypes.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        }),
        map(() => new ProfileEditActions.ProfileEditClear()),
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private firebaseAuth: AngularFireAuth,
        private zone: NgZone,
        private db: AngularFirestore,
    ) {}
}
