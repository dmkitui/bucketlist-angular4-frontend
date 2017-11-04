import { Component, OnInit, OnDestroy} from '@angular/core';
import swal, {SweetAlertOptions} from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service.service';
import { RegistrationService } from '../../services/api.service';
import { AuthGuard } from '../../auth/auth.guard';


@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})

export class TitleBarComponent implements OnInit {
  title = 'Bucketlist Online Service';
  bucketlists = [];
  error: string;

  constructor(private alertService: AlertService,
              private router: Router,
              private api_service: RegistrationService,
              private authservice: AuthGuard
  ) {}
  ngOnInit() {
    this.loginStatus();
  }
  ngOnDestroy() {}

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser')).user_email;
  }
  loginStatus() {
    return this.authservice.tokenStatus();
  }

  logout() {
    this.api_service.logout();
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
  async addBucketlist(name) {
    console.log('Name: ', name);
    let data: any;
    await this.api_service.newBucketlistDB(name).then(res => {
      data = res.json();
      console.log('DATA  : ', res.json());
      if (data.message) {
        this.bucketlists = [];
        console.log(data.message);
        swal({
          type: 'error',
          html: `` + data.message + ``,
          timer: 10000
        }).catch(error => error);
        return false;
      } else {
        swal({
          type: 'success',
          html: `New bucketlist <b>` + data.name + `</b> successfully added.`,
          timer: 3000
        }).catch(error => console.log('Error: ', error));
      }
    });
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
          setTimeout(function () {
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
      });
  }
}
