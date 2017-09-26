import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BucketlistsServiceService {
  status: any;
  logged_in_status: Subject<boolean> = new Subject<boolean>();
  constructor() {}
  bucketlists = [
    {'name': 'travel the world', 'id': 1, 'items': []},
    {'name': 'Learn Programming', 'id': 2, 'items': [{'name': 'Java', 'done': false}, {'name': 'Python', 'done': true}]},
    {'name': 'Dominate the world', 'id': 3, 'items': []},
    {
      'name': 'Invent something',
      'id': 4,
      'items': [{'name': 'Energy source', 'done': true}, {'name': 'Alcohol', 'done': false}, {'name': 'sex styles', 'done': true}]
    },
    {'name': 'Win a marathon', 'id': 5, 'items': []}
  ];
  user_info = {
    'email': 'dmkitui@gmail.com',
    'password': '23566010'
  };
  change(loggedIn) {
    if (loggedIn) {
      this.status = !status;
      this.logged_in_status.next(this.status);
    }
  }
  login (email, password) {
    if (email === this.user_info.email && password === this.user_info.password) {
      this.change(true);
      return true;
    } else {
      this.change(false);
      return false;
    }
  }
}
