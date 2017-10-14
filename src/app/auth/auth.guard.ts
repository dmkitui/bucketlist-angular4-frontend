import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true
      console.log('Logged In');
      // localStorage.getItem('token')
      return true;
    }
    // not logged in so redirect to login page
    console.log('Not Logged IN!!!!!!!!!!!');
    this.router.navigate(['/login']);
    return false;
  }
}
