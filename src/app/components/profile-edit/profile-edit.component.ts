import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

import {
    ProfileEditSet,
    ProfileEditUpdate,
} from './store/profile-edit.actions';
import { AppState } from '../../store/app.reducer';

@Component({
    selector: 'ita-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, AfterViewInit, OnDestroy {
    public profileForm: FormGroup;
    url: string;
    defaultImage = '../../assets/avatarDefault.png';
    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private store: Store<AppState>,
    ) {
        this.profileForm = this.formBuilder.group({
            userName: this.formBuilder.control(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
            userSurname: this.formBuilder.control(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(15),
            ]),
        });
    }

    ngOnInit(): void {
        this.store
            .select('editProfile')
            .pipe(takeUntil(this.destroy$))
            .subscribe(inf => {
                console.log(inf);
                if (inf) {
                    this.profileForm.get('userName').setValue(inf.name);
                    this.profileForm.get('userSurname').setValue(inf.surname);
                    this.url = this.defaultImage;
                }
            });
    }
    ngAfterViewInit(): void {
        // debugger;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addAvatar(event) {
        const dialogRef = this.dialog.open(ModalDialogComponent, {
            height: '500px',
            width: '500px',
            data: event,
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.url = result;
            });
    }

    getRawData(): void {
        this.store.dispatch(
            new ProfileEditSet({
                name: this.profileForm.get('userName').value,
                surname: this.profileForm.get('userSurname').value,
                avatar: '', // will be new img url
            }),
        );
    }
}
