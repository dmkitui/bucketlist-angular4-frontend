import { Component, OnInit } from '@angular/core';
import { BucketlistsServiceService } from '../bucketlists-service.service';
import swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  title = 'Bucketlist Online Service';
  bucketlists = [];
  logged_in = false;
  constructor(private bucketlists_service: BucketlistsServiceService) {
  }

  ngOnInit() {
    this.bucketlists = this.bucketlists_service.bucketlists;
    this.logged_in = this.bucketlists_service.loggedIn;
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
