import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BucketlistsServiceService } from '../bucketlists-service.service';
import { AlertService } from '../alert-service.service';

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
  constructor(private alertService: AlertService, private router: Router, private bucketlists_service: BucketlistsServiceService) { }

  ngOnInit() {
  }
  logIn(email, pwd) {
    console.log(email, pwd);
    if (this.bucketlists_service.login(email, pwd)) {
      this.router.navigate(['/bucketlistview']);
      this.alertService.success('Log in successful.');
    } else {
      this.invalid_credential = true;
      this.alertService.error('Error during Login');
    }
  }
  remove_error() {
    if (this.invalid_credential) {
      this.invalid_credential = false
    }
  }
}
