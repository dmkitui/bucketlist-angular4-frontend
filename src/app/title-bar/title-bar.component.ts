import { Component, OnInit, OnDestroy} from '@angular/core'; // ChangeDetectionStrategy
import swal, {SweetAlertOptions} from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertService } from '../alert-service.service';
import { RegistrationService } from '../api.service';
import { AuthGuard } from '../auth/auth.guard';


@Component({
  selector: 'app-title-bar',
  // changeDetection: ChangeDetectionStrategy.Default,
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
    return (localStorage.getItem('token') && localStorage.getItem('currentUser'));
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
        // return data.message;
        this.error = data.message;
        return false;
      } else {
        // this.bucketlists = data;
        console.log('XXXXXXXX', res.json());
        return res.json();
        // ans = res.json();
      }
    });
    // console.log('ANS', ans)
    // return ans;
    // event.stopPropagation();
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
      let answer = self.addBucketlist(text).then(res => res);
      console.log('ANSWER: ', answer)
      if (answer) {
        swal({
          type: 'success',
          html: `New bucketlist <b>${text}</b> successfully added.`,
          timer: 1000
        }).catch(error => console.log('Error: ', error));
      } else {
        swal({
          type: 'error',
          html: `Not created!`,
          timer: 1000
        }).catch(error => console.log('Error: ', error));
      }

    });
  }
}
