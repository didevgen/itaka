import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EdProfActions from './profile-edit.actions';
import { ProfileEditService } from '../profile-edit.service';

@Injectable()
export class ProfileEditEffect {
    /*saveImageUrlProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EdProfActions.ProfileEditTypes.ProfileEdit_Set),
            mergeMap(act =>
                this.imgSaveService.getUrl(act.payload.avatar).pipe(
                    // needs to add service saveData??
                    map(
                        url =>
                            new EdProfActions.ProfileEditSetSuccess({
                                name: act.payload.name,
                                surName: act.payload.surName,
                                avatar: url,
                            }),
                    ),
                    catchError(() =>
                        of(new EdProfActions.ProfileEditSetError()),
                    ),
                ),
            ),
        ),
    );*/

    loadEditProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EdProfActions.ProfileEditTypes.ProfileEdit_Set),
            mergeMap(act =>
                this.dataService.saveData(act.payload).pipe(
                    map(
                        ({ payload }) =>
                            new EdProfActions.ProfileEditSetSuccess({
                                name: payload.name,
                                surName: payload.surName,
                                avatar: payload.avatar,
                            }),
                    ),
                    catchError(() =>
                        of(new EdProfActions.ProfileEditSetError()),
                    ),
                ),
            ),
        ),
    );
    constructor(
        private actions$: Actions,
        private dataService: ProfileEditService,
    ) {}
}
