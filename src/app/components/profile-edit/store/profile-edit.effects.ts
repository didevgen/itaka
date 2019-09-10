import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import * as ProfileEditActions from './profile-edit.actions';
import { ProfileEditService } from '../profile-edit.service';

@Injectable()
export class ProfileEditEffect {
    constructor(
        private actions$: Actions,
        private dataService: ProfileEditService,
    ) {}

    setEditProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileEditActions.ProfileEditTypes.ProfileEdit_Set),
            switchMap((act: ProfileEditActions.ProfileEditSet) =>
                this.dataService.saveData(act.payload).pipe(
                    map(
                        data =>
                            new ProfileEditActions.ProfileEditSuccess({
                                name: data.name,
                                surname: data.surname,
                                avatar: data.avatar,
                            }),
                    ),
                    catchError( () =>
                        throwError(
                            new ProfileEditActions.ProfileEditError({
                              ...act.payload,
                              isError: true,
                            }),
                        )
                    ),
                ),
            ),
        ),
    );

    /*loadEditProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileEditActions.ProfileEditTypes.ProfileEdit_Update),
            switchMap(() =>
                this.dataService.loadData().pipe(
                    map(
                        data =>
                            new ProfileEditActions.ProfileEditLoad({
                                name: data.name,
                                surname: data.surname,
                                avatar: data.avatar,
                            }),
                    ), // return undefind into state
                ),
            ),
        ),
    );*/
}
