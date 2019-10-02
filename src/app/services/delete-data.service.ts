import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeleteDataService {
    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage,
    ) {}

    public deleteData(postId: string): Observable<any> {
        const deleteFromDb = this.deleteDataFromDb(postId);
        return from(deleteFromDb);
    }

    private deleteDataFromDb(postId: string): Promise<any> {
        return this.db
            .collection('Posts')
            .doc(postId)
            .delete();
    }
}
