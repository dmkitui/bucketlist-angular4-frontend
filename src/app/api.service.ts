import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
  private regUrl = 'http://127.0.0.1:5000/api/v1/auth/register';
  private loginUrl = 'http://127.0.0.1:5000/api/v1/auth/login';
  private bucketlistUrl = 'http://127.0.0.1:5000/api/v1/bucketlists/';

  token: any = {};
  constructor(private http: Http) { }
  register(user_email: string, password: string, confirm_password: string): Observable<Response> {
    let headers    = new Headers({ 'Content-Type': 'application/json' });
    let options    = new RequestOptions({ headers: headers });
    let body = {'user_email': user_email, 'user_password': password, 'confirm_password': confirm_password};
    return this.http.post(this.regUrl, body, options)
      .map((response: Response) => {
        console.log('Backend RES: ', response.json());
        this.login(user_email, password);
        return response.json();
      })
      .catch(error => {
        console.log('Backend ERROR!!!!: ', error.json());
        return Observable.throw(error.json() || 'backend server error');
      });
  }
  login(user_email: string, user_password: string) {
    console.log('Trying to login a MF!!!', user_email, user_password);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.loginUrl, {'user_email': user_email, 'user_password': user_password}, options)
      .map((response: Response) => {
        let token = response.json() && response.json().access_token;
        if (token) {
          // set token property
          // this.token = response.json().access_token;
          localStorage.setItem('token', response.json().access_token);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({user_email: user_email}));
          // return true to indicate successful login
          return response.json();
        }
      })
      .catch(error => {
        console.log('Backend ERROR!!!!: ', error.json());
        return Observable.throw(error.json() || 'backend server error');
      });
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
  async  bucketlists(): Promise<Response> {
    let token = localStorage.getItem('token');
    console.log('Fetching bucketlists?', token);
    let user_token = 'Bearer ' + token;
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': user_token});
    let options = new RequestOptions({headers: headers});
    try {
      let bucketlist = await this.http
        .get(this.bucketlistUrl, options)
        .toPromise();
      console.log('RESPONSE: ', bucketlist.json());

      return bucketlist.json();
    } catch (error) {
      await this.errorHandler(error);
    }
  }
  errorHandler (error) {
    console.log(error);
  }
  async newBucketlistDB(name): Promise<Response> {
    console.log('Adding New: ', name)
    let token = localStorage.getItem('token');
    let user_token = 'Bearer ' + token;
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': user_token});
    let options = new RequestOptions({headers: headers});
    let body = { 'name': name };
    try {
      let bucketlist = await this.http
        .post(this.bucketlistUrl, body, options)
        .toPromise();
      console.log('RESPONSE NEW: ', bucketlist.json());
      return bucketlist;
    } catch (error) {
      return error;
      // await this.errorHandler(error);
    }
  }
  async deleteBucketlist(id): Promise<Response> {
    console.log('To delete: ', id);
    let token = localStorage.getItem('token');
    let user_token = 'Bearer ' + token;
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': user_token});
    let options = new RequestOptions({headers: headers});
    let body = { 'name': name };
    let deleteUrl = 'http://127.0.0.1:5000/api/v1/bucketlists/' + parseInt(id, 10);
    try {
      let res = await this.http
        .delete(deleteUrl, options)
        .toPromise();
      console.log('Delete: ', res.json());
      return res;
    } catch (error) {
      return error;
      // await this.errorHandler(error);
    }
  }
}
