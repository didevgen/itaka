import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeleteDataService {
    constructor(private db: AngularFirestore) {}

    private deleteDataFromDb(postId: string): Promise<any> {
        return this.db
            .collection('Posts')
            .doc(postId)
            .delete();
    }

    public deleteData(postId: string): Observable<any> {
        const deleteFromDb = this.deleteDataFromDb(postId);
        return from(deleteFromDb);
    }
}
