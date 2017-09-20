import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BucketlistsServiceService } from '../bucketlists-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login To Access Service';
  user_email = '';
  password = '';
  invalid_credential = false;
  constructor(private router: Router, private bucketlists_service: BucketlistsServiceService) { }

  ngOnInit() {
  }
  logIn(email, pwd) {
    console.log(email, pwd);
    if (this.bucketlists_service.login(email, pwd)) {
      this.router.navigate(['/bucketlistview']);
    } else {
      this.invalid_credential = true;
    }
  }
  remove_error() {
    if (this.invalid_credential) {
      this.invalid_credential = false
    }
  }

}
