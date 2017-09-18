import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logIn(email, pwd) {
    console.log(email, pwd);
    if (this.user_email === 'dmkitui@gmail.com' && this.password === '23566010') {
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
