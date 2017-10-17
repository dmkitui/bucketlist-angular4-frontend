import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service.service';
import { RegistrationService } from '../../services/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistrationComponent implements OnInit {
  title: 'User Registration';
  user_email: '';
  password: '';
  confirm_password: '';
  password_mismatch = false;
  user: any = {};
  message: any;
  errorMessage: any;

  constructor(private alertService: AlertService,
              private router: Router,
              private registrationService: RegistrationService
  ) {}

  ngOnInit() {
  }
  registration() {
    this.registrationService.register(this.user_email, this.password, this.confirm_password)
      .subscribe(
        response => {
          console.log('UI RESPONSE: ', response, response.status);
          this.message = response;
          this.alertService.success('Registration successful. Welcome to Bucketlist ' + this.user_email);
          this.router.navigate(['/bucketlistview']);
        },
        error => {
          console.log('Errors: ', error);
          this.errorMessage = error.message;
        },
        () => console.log('yay')
      );
  }
  pwd_check() {
    if (this.confirm_password !== this.password) {
      console.log('Wrong PWD', this.password, 'Confirm: ', this.confirm_password);
      this.password_mismatch = true;
    } else {
      this.password_mismatch = false;
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
}
