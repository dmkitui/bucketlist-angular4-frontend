import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate {
  logged_in_status: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      console.log('confirming status!');
      if (tokenNotExpired()) {
        this.logged_in_status.next(true);
        console.log('Not expired!', this.logged_in_status);
        return true;
      }
      // not logged in so redirect to login page
      console.log('Not Logged IN!!!!!!!!!!!');
      this.logged_in_status.next(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
