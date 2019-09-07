import { EditProfile } from '../../models/edit-profile/edit-profile.model';
import { from, Observable, of, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user/User.models';

export class ProfileEditService {
    data: EditProfile;
    dbUrl: string;
    userID: string;
    counter: number;

    constructor(
        private http: HttpClient,
        private storage: AngularFireStorage,
        private db: AngularFirestore, // private afc: AngularFirestoreCollection,
    ) {
        // this.dbUrl = environment.firebaseConfig.databaseURL;
        this.counter = 0;
    }

    saveData(payload: EditProfile): Observable<any> {
        this.data = payload;
        this.userID = '200 OK ' + this.counter++; // localStorage.getItem('id') ||
        let newDataForEffect: EditProfile;
        console.log(this.counter);
        const docR = this.db.doc('Users/' + this.userID);
        docR.set({ ...this.data }, { merge: true }).catch(err => {
            if (!newDataForEffect) {
                newDataForEffect = this.data;
            }
            console.log(
                '!!! error from promise in service to set fb data: ',
                err,
            );
        });
        return from(docR.get().forEach(d => d.data() as EditProfile)); // .ref.get().then(); // .valueChanges();
        /*.pipe(
          map(data => {
            newDataForEffect = data;
            return data[this.userID];
          }),
        );*/
        /*console.log('newDataForEffect =>> ', newDataForEffect);
        console.log('o$ =>> ', o$);*/

        // return this.db.collection('Users').valueChanges();

        // console.log('this.userID =>> ', this.userID);
        // .doc(`${this.userID}-1`)

        /*this.db
            .collection('Users')
            .doc(`${this.userID}`)
            .valueChanges()
            .pipe(
                map(data => {
                    newDataForEffect = data;
                    return data[this.userID];
                }),
            );*/

        /*if (!newDataForEffect) {
            newDataForEffect = this.data;
        }
        return of(newDataForEffect);*/

        /*this.http
            .get(
                `https://firestore.googleapis.com/v1beta1/projects/itaka-9db8e/databases/(default)/documents/Users/${this.userID}`,
            )
            .pipe(
                map(data => {
                    newDataForEffect = data;
                    console.log(data);
                }),
            );*/

        /*const collection = this.db.collection('Users', ref =>
            ref.where('email', '==', email),
        );
        const user$ = collection.valueChanges().pipe(
            map(users => {
                const user = users[0];
                console.log(user);
                return user;
            }),
        );

        return user$;*/

        /*this.db.collection("Users").where("capital", "==", true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });*/

        /* this.db
           .collection('Users')
           .get()
           .toPromise()
           .then(querySnapshot =>
               querySnapshot.forEach(doc => {
                   newDataForEffect = doc.data();
                   console.log(doc.data());
               }),
           );*/

        /*.subscribe(user => {
        console.log(user.id);
        this.db.collection ("TestPosts").doc(this.newId)
          .set(
            {downloadURL: this.downloadURL, path, id: user.id}
          )
        // Get all collection
        this.db.collection("TestPosts").get().toPromise().then(querySnapshot =>
          querySnapshot.forEach(doc =>
            console.log(doc.id, " => ", doc.data()))
        )*/

        /*return this.http
          .post<EditProfile>(
              `${this.dbUrl}/Users/${this.userID}.json`,
              this.data,
          )
          .pipe(map(res => {
            if (res.name === this.userID){
              return this.data;
            } else {
              throwError('incorrect user ID');
            }
          }));*/
    }
}
