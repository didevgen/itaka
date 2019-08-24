import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-googleIn_with_auth0',
  templateUrl: './googleIn_with_auth0.component.html',
  styleUrls: ['./googleIn_with_auth0.component.css']
})
export class GoogleIn_with_auth0Component implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.localAuthSetup();
  }

}
