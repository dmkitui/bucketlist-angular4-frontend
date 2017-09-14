import { Injectable } from '@angular/core';

@Injectable()
export class BucketlistsServiceService {

  constructor() { }
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
}
