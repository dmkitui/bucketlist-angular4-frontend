import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private router: Router) { }

  ngOnInit() {
  }
  logIn(email, pwd) {
    console.log(email, pwd);
    if (this.user_email === 'your value' && this.password === 'your value') {
      this.router.navigate(['/show_alunos']);
    }
  }

}
