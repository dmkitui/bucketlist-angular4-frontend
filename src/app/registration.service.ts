import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistrationService {
  private regUrl = 'http://127.0.0.1:5000/api/v1/auth/register';
  // 'https://flask-api-bucketlist.herokuapp.com/api/v1/auth/register';
  res: any = {};
  resp: any = {};
  error: Response;
  constructor(private http: Http) { }
  register(username: string, password: string, confirm_password: string): Observable<Response> {
    let headers    = new Headers({ 'Content-Type': 'application/json' });
    let options    = new RequestOptions({ headers: headers });
    let body = {'user_email': username, 'user_password': password, 'confirm_password': confirm_password};
    return this.http.post(this.regUrl, body, options)
      .map((response: Response) => {
        console.log('Backend RES: ', response.json());
        return response.json();
      })
      .catch(error => {
        console.log('Backend ERROR!!!!: ', error.json());
        return [error.json()];
      });
  }

}
