import { Component } from '@angular/core';
import { BucketlistsServiceService } from './bucketlists-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bucketlist Frontend';
  isLoggedIn = false;
  // state = ['logIn', 'logOut', 'register', 'homepage'];
  logIn = true;
  state = 'homepage';
  constructor(private bucketlists_service: BucketlistsServiceService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.bucketlists_service.loggedIn;
  }
}
