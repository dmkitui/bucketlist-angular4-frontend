import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
  private regUrl = 'http://127.0.0.1:5000/api/v1/auth/register';
  private loginUrl = 'http://127.0.0.1:5000/api/v1/auth/login';
  // 'https://flask-api-bucketlist.herokuapp.com/api/v1/auth/register';
  res: any = {};
  resp: any = {};
  error: Response;
  token: any = {}
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
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({user_email: user_email, token: token}));
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
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
