import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as EdProfActions from 'profile-edit.actions';

@Injectable()
export class ProfileEditEffect {
    loadEditProfile$ = createEffect(() =>
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
    );

    constructor(private actions$: Actions) {}
}
