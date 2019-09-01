import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as EdProfActions from 'profile-edit.actions';

@Injectable
export class ProfileEditEffect {
    loadEditProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EdProfActions.ProfileEditTypes.ProfileEdit_Set),
            mergeMap(val =>
                this.imgUrlService.getUrl(val.payload.avatar).pipe(
                    map(
                        url =>
                            new EdProfActions.ProfileEditSetSuccess({
                                name: val.name,
                                surName: val.surName,
                                avatar: url,
                            }),
                    ),
                    catchError(() =>
                        of(new EdProfActions.ProfileEditSetError()),
                    ),
                ),
            ),
        ),
    );

    constructor(private actions$: Actions) {}
}
