import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent implements OnInit {
  selectedFile = null
  constructor(private http: HttpClient) {  }
  

  onFileSelected (event) {
    console.log(event)
    this.selectedFile = event.target.files[0]
  }

  onUpload () {
    console.log("upload")
    
  }

  ngOnInit() {
  }

}
