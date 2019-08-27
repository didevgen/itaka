import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  url: string;
  defaultImage = '../../assets/avatarDefault.png';
  
  constructor() { }

  ngOnInit() {
  }

}
