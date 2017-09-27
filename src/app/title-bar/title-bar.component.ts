import { Component, OnInit, OnDestroy } from '@angular/core';
import { BucketlistsServiceService } from '../bucketlists-service.service';
import swal, {SweetAlertOptions} from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertService } from '../alert-service.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  title = 'Bucketlist Online Service';
  bucketlists = [];
  logged_in: any;
  user = {};
  _subscription: any;
  constructor(private alertService: AlertService, private router: Router, private bucketlists_service: BucketlistsServiceService) {
    this.logged_in = false;
    this._subscription = this.bucketlists_service.logged_in_status.subscribe((value) => {
      this.logged_in = value;
    });
  }
  ngOnInit() {
    this.bucketlists = this.bucketlists_service.bucketlists;
    this.user = this.bucketlists_service.user_info;
  }
  ngOnDestroy() {
   // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }
  user_info (user) {
    return user.email;
  }
  logout() {
    this.bucketlists_service.logout();
    this.router.navigate(['/home']);
    this.alertService.success('Logout successful');
  }
  items_count() {
    let count = 0;
    for (let bucketlist of this.bucketlists) {
      count += bucketlist.items.length;
    }
    return count;
  }
  done_items_count() {
    let count = 0;
    for (let bucketlist of this.bucketlists) {
      for (let item of bucketlist.items){
        if (item.done) {
          count += 1;
        }
      }
    }
    return count;
  }
  addBucketlist(name) {
    let new_bucketlist = {
      'name': name,
      'id' : this.bucketlists.length + 1,
      'items': []
    };
    this.bucketlists.push(new_bucketlist);
    event.stopPropagation();
  }
  newBucketlist() {
    const self = this;
    swal({
      title: 'New Bucketlist',
      input: 'text',
      inputPlaceholder: 'New bucketlist name',
      showCancelButton: true,
      preConfirm: function (text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (!(text)) {
              reject('Bucketlist name cannot be blank');
            } else {
              resolve();
            }
          }, 50);
        });
      },
      allowOutsideClick: false
    }).then(function (text) {
      self.addBucketlist(text);
      swal({
        type: 'success',
        html: `New bucketlist <b>${text}</b> successfully added.`,
        timer: 1000
      });
    });
  }
}
