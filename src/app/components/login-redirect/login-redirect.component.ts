import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout((router: Router) => {
        this.router.navigate(['login']);
    }, 5000);  // 5s
  }
  redirectNow() {
    this.router.navigate(['login']);
  }

}
