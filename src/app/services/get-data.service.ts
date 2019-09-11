import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GetDataService {
    constructor(
        private db: AngularFirestore,
        private store: Store<fromApp.AppState>,
    ) {}
    render(media): void {
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    const items = doc.data();
                    media.push(items);
                });
            });
    }

    renderUserContent(): void {
        this.store
            .select('auth')
            .pipe(map(authState => authState.user))
            .subscribe(user => {
                console.log(user.id);
            });
    }
}
