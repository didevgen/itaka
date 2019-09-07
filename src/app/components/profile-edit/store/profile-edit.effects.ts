import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EdProfActions from './profile-edit.actions';
import { ProfileEditService } from '../profile-edit.service';

@Injectable()
export class ProfileEditEffect {
    loadEditProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EdProfActions.ProfileEditTypes.ProfileEdit_Set),
            switchMap((act: EdProfActions.ProfileEditSetSuccess) =>
                this.dataService.saveData(act.payload).pipe(
                    map(
                        payload =>
                            new EdProfActions.ProfileEditSetSuccess({
                                name: payload.name,
                                surName: payload.surName,
                                avatar: payload.avatar,
                                isError: payload.isError,
                            }),
                    ),
                    catchError(err => {
                        return of(new EdProfActions.ProfileEditSetError());
                    }),
                ),
            ),
        ),
    );
    constructor(
        private actions$: Actions,
        private dataService: ProfileEditService,
    ) {}
}
