import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      console.log('confirming status!');
      if (tokenNotExpired()) {
        return true;
      }
    }
    console.log('Not Logged IN!!!!!!!!!!!');
    this.router.navigate(['/login-redirect']);
    return false;
  }
  tokenStatus() {
    if (tokenNotExpired()) {
      return true;
    } else {
      return false;
    }
  }
}
