// import { Component, OnInit } from '@angular/core';
// import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
// import {enableProdMode} from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { finalize,filter,switchMap } from "rxjs/operators";
// import {FileUpload} from './upload'


// @Component({
//   selector: 'app-test-upload',
//   templateUrl: './test-upload.component.html',
//   styleUrls: ['./test-upload.component.scss']
// })
// export class TestUploadComponent implements OnInit {

//   color = 'accent';
//   mode = 'determinate';
  
//   ref: AngularFireStorageReference;
//   task: AngularFireUploadTask;
//   uploadProgress: Observable<number>;
//   downloadURL: Observable<string>;
//   uploadState: Observable<string>;
//   uploadPercent: Observable<number>;

//   constructor(private afStorage: AngularFireStorage) {}

   
//       // upload(event) {
//       //   debugger;
//       //   console.log("ggg")
//       //   const file = event.target.files[0]
//       //   var filePath = `${event.target.files[0].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
//       //   const fileRef = this.afStorage.ref(filePath);
//       //   this.task = this.afStorage.upload(file);
//       //   this.uploadProgress = this.task.percentageChanges();
//       //   this.downloadURL = fileRef.getDownloadURL();
//       //   // this.downloadURL.toPromise().then((r)=>console.log(r));
        
//       // }
//       url
//       perc
//       upload (event) {
//         console.info(event)
//         var filePath = `${event.target.files[0].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
//         const fileRef = this.afStorage.ref(filePath);
//         // this.task = this.afStorage.upload(filePath ,event.target.files[0]);
//         // this.uploadProgress = this.task.percentageChanges();
//         this.afStorage.upload(filePath, event.target.files[0]).snapshotChanges().pipe(
//         finalize(() => {
//           fileRef.getDownloadURL().subscribe((url) => {
//             console.log(url)
//             this.downloadURL = url
//             console.log(this.downloadURL)
//           })
//         })
//       ).subscribe();
     
//       // this.task.snapshotChanges().pipe(
//       //   finalize(() => {
//       //     fileRef.getDownloadURL().subscribe(downloadURL => {
//       //       console.log('File available at', downloadURL);
//       //     });
//       //   })
//       // ).subscribe();
    
//       // this.uploadProgress=this.task.percentageChanges();
    
//      }
    
//     ngOnInit() {
//     }

// }

