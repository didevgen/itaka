import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
@Component({
    selector: 'ita-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
    url: string | Blob;
    name: string;
    defaultImage = '../../assets/avatarDefault.png';
    private userSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.userSub = this.store.select('editProfile').subscribe(user => {
            this.name = user.name;
            this.url = user.avatar;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
