import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeleteDataService {
    constructor(private db: AngularFirestore) {}

    private deleteDatafromDb(postId: string): Promise<any> {
        return this.db
            .collection('Posts')
            .doc(postId)
            .delete();
    }

    public deleteData(postId: string) {
        const deleteContent = from(this.deleteDatafromDb(postId));
        deleteContent.subscribe(snapshot => {});
    }
}
