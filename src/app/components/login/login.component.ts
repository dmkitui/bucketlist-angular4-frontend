import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service.service';
import { RegistrationService } from '../../services/api.service';
import swal, {SweetAlertOptions} from 'sweetalert2';

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
  error: any;
  public loading = false;
  constructor(private alertService: AlertService, private router: Router, private registrationService: RegistrationService) { }

  ngOnInit() {
    // this.registrationService.logout();
  }
  logIn(user_email, password) {
    this.loading = true;
    this.registrationService.login(user_email, password)
      .subscribe(
        response => {
          console.log('UI RESPONSE: ', response);
          this.loading = false;
          this.alertService.success('Login successful.');
          this.router.navigate(['/bucketlistview']);
        },
        error => {
          console.log('Errors: ', error);
          this.loading = false;
          if (error.type === 'error') {
            swal(
              'Error Connecting',
              'Something went wrong while trying to log you in.!',
              'error'
            );
          }
          this.error = error.message;
        },
        () => console.log('yay')
      );
  }
  remove_error() {
    if (this.invalid_credential) {
      this.invalid_credential = false;
    }
  }
  register() {
    this.router.navigate(['/register']);
  }
}
