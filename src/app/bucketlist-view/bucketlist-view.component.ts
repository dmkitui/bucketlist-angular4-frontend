import {Component, Directive, OnInit} from '@angular/core';
import swal, {SweetAlertOptions} from 'sweetalert2';
import { BucketlistsServiceService } from '../bucketlists-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bucketlist-view',
  templateUrl: './bucketlist-view.component.html',
  styleUrls: ['./bucketlist-view.component.css']
})

export class BucketlistViewComponent implements OnInit {
  title = 'Bucketlists';
  showItems = false;
  selectedItem = Number;
  status = false;
  bucketlists = [];
  scrollable = false;
  scrolled_top = true;
  // bucketlists = this.BucketlistsServiceService.bucketlists;
  item_status (state) {
    console.log(state);
    if (state === true) {
      return 'DONE';
    } else {
      return 'Not Yet';
    }
  }

  constructor(private bucketlists_service: BucketlistsServiceService) {
  }

  ngOnInit() {
    this.bucketlists = this.bucketlists_service.bucketlists;
  }
  setClickedItem (index) {
    this.selectedItem = index;
    if (this.bucketlists[index].items.length > 0) {
      this.showItems = !this.showItems;
    }
    console.log(index, this.showItems, this.selectedItem);
    if (!(this.selectedItem === index)) {
      this.showItems = true;
    }
  }
  editBucketlistName(item, title) {
    let ind = this.bucketlists.indexOf(item);
    let bucketlist = this.bucketlists[ind];
    if (!(title === bucketlist.name)) {
      bucketlist.name = title;
    } else {
      swal({
        title: 'Cannot update bucketlist name',
        text: 'The name has not changed!!',
        type: 'error',
      });
    }
    event.stopPropagation();
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

  deleteBucketlist(item) {
    let ind = this.bucketlists.indexOf(item);
    this.bucketlists.splice(ind, 1);
    event.stopPropagation();
  }

  addItemToBucketlist(item, text) {
    let ind = this.bucketlists.indexOf(item);
    let bucketlist = this.bucketlists[ind];
    bucketlist.items.push({'name': text, 'done': false});
    event.stopPropagation();
  }

  deleteItem(item) {
    const self = this;
    swal({
      title: 'Confirm Delete of Bucketlist Item.',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#5aaa3d',
      confirmButtonText: 'Delete it!',
      width: '700px',
      customClass: 'confirmationBox'
    }).then(function (isConfirm) {
      if (isConfirm) {
        self.deleteBucketlist(item);
        swal({
          title: 'Deleted!',
          text: 'Item deleted Successfully.',
          type: 'success',
          timer: 1500,
          confirmButtonColor: '#5aaa3d'
        });
      }
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'Bucketlist Item not deleted',
          type: 'error',
          timer: 1500,
          confirmButtonColor: '#5aaa3d'
        });
      }
    });
    event.stopPropagation();
  }
  addItem(item) {
    const self = this;
    swal({
      width: '700px',
      title: 'Add Item to bucketlist',
      html: `Bucketlist name: <b> ${item.name.toUpperCase()}</b>`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Add Item',
      allowOutsideClick: false,
      }).then(function(text){
        if (text) {
          self.addItemToBucketlist(item, text);
        }
    }).then(function (email) {
      swal({
        type: 'success',
        title: 'Item Added successfully',
        html: `New item added to <b> ${item.name.toUpperCase()}</b>`,
        timer: 1500
      });
    });
    event.stopPropagation();
  }
  editItem(event, item) {
    const self = this;
    swal({
      width: '700px',
      title: 'Edit Item',
      html: `Bucketlist name: <b> ${item.name.toUpperCase()}</b>`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Edit title',
      allowOutsideClick: false,
      inputPlaceholder: item.name,
      preConfirm: function (text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (!(text)) {
              reject('New Bucketlist name cannot be blank');
            } else if (text === item.name) {
              reject('New name cannot be same as current name');
            } else {
              resolve();
            }
          }, 50);
        });
      },
      }).then(function(text){
        if (text && !(text === item.name)) {
          self.editBucketlistName(item, text);
        }
    }).then(function (text) {
      swal({
        type: 'success',
        title: 'Bucketlist Item name updated',
        timer: 2000,
        html: `New bucketlist title <b>${item.name.toUpperCase()}</b>`
      });
    });
    event.stopPropagation();
  }
  complete_item(event, x, done, item) {
    console.log('DONE?:' + done);
    done = !done;
    let btn = document.getElementById(x);
    btn.textContent = this.item_status(done);
    item.items[x].done = done;
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
  scroll_detector () {
    console.log('mambo haya....')
    let display_port = document.getElementsByClassName('mainView')[0];
    if (display_port.scrollHeight > display_port.clientHeight) {
      console.log('XXXXX', display_port.scrollHeight)
      this.scrollable = true;
      console.log('RESULT?', display_port.scrollHeight - display_port.scrollTop - display_port.clientHeight);
      if ((display_port.scrollHeight - display_port.scrollTop - display_port.clientHeight) > 0) {
        document.getElementsByClassName('scroll-indicator-bottom')[0].classList.remove('scroll-bottom');
      } else {
        console.log('REMOVED?????????????????')
        document.getElementsByClassName('scroll-indicator-bottom')[0].classList.add('scroll-bottom');
      }
    } else {
      this.scrollable = false;
      console.log('TTTTTT');
    }
    console.log('SCROLLTOP', display_port.scrollTop)
    if (display_port.scrollTop === 0) {
      this.scrolled_top = true;
    } else {
      this.scrolled_top = false;
    }
  }
}
