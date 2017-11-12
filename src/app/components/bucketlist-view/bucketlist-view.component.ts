import {Component, Directive, OnInit, Input} from '@angular/core';
import swal, {SweetAlertOptions} from 'sweetalert2';
import { RegistrationService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import {any} from 'codelyzer/util/function';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bucketlist-view',
  templateUrl: './bucketlist-view.component.html',
  styleUrls: ['./bucketlist-view.component.css']
})

export class BucketlistViewComponent implements OnInit {
  title = 'Bucketlists';
  showItems = false;
  selectedItem = Number;
  bucketlists: any = [];
  paginationInfo: any = {};
  scrollable = false;
  scrolled_top = true;
  editRowId: any;
  public loading = true;

  editRow(id) {
    this.editRowId = id;
    event.stopPropagation();
  }

  item_status (state) {
    if (state) {
      return 'DONE';
    } else {
      return 'Not Yet';
    }
  }

  constructor(private api_service: RegistrationService) {
    this.fetchBucketlists();
  }

  ngOnInit() {}

  async fetchBucketlists() {
    this.loading = true;
    let data: any;
    await this.api_service.getBucketlists().then(res => {
      data = res;
      console.log('DATA  : ', data);
      if (data.message) {
        this.bucketlists = [];
        this.loading = false;
        return res;
      }
      this.paginationInfo = data.pop();
      this.bucketlists = data;
      this.loading = false;
      return res;
    });
  }

  focusedBucketlist (event, index) {
    this.editRow(any);
    if (this.selectedItem === index) {
      this.showItems = !this.showItems;
    } else {
      this.selectedItem = index;
      this.showItems = true;
    }
    event.target.scrollIntoView(true);
  }
  async editBucketlistName(bucketlist_id, New_title) {
    let data:any;
    swal.showLoading();
    await this.api_service.editBucketlistName(bucketlist_id, New_title).then(res => {
      let data = res.json();
      if (res.status === 200) {
        console.log(data);
        swal({
          title: 'Edit Bucketlist Item',
          text: 'Item Updated Successfully.',
          type: 'success',
          timer: 3500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        this.fetchBucketlists();
      } else {
        swal({
          title: 'Add Bucketlist Item',
          text: res.status + '  ' + data.message,
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      }
    });
    event.stopPropagation();
  }

  async deleteBucketlist(id) {
    await this.api_service.deleteBucketlist(id).then(res => {
      if (res.status === 200) {
        swal({
          title: 'Deleted!',
          text: 'Item deleted Successfully.',
          type: 'success',
          timer: 1500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        this.fetchBucketlists();
      } else {
        swal({
          title: 'Error Deleting Bucketlist!',
          text: 'A problem occured while deleting bucketlist.',
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      }
    });
  }

  async addItemToBucketlist(id, item_name) {
    let data:any;
    await this.api_service.addItem(id, item_name).then(res => {
      let data = res.json();
      if (res.status === 201) {
        swal({
          title: 'Add Bucketlist Item',
          text: 'Item added Successfully.',
          type: 'success',
          timer: 3500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        this.fetchBucketlists();
      } else {
        swal({
          title: 'Add Bucketlist Item',
          text: res.status + '  ' + data.message,
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      }
    });
  }

  deleteItem(id) {
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
        self.deleteBucketlist(id);
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
        }).catch(error => console.log('Error: ', error));
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
      showLoaderOnConfirm: true,
      preConfirm: function (text) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (!(text)) {
              reject('New item name cannot be blank');
            } else {
              resolve();
            }
          }, 50);
        });
      },
      }).then(function(text){
        if (text) {
          self.addItemToBucketlist(item.id, text);
        }
    });
    event.stopPropagation();
  }
  editBucketlist(event, item) {
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
      showLoaderOnConfirm: true,
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
      }).then(function(text) {
      if (text && !(text === item.name)) {
        self.editBucketlistName(item.id, text);
      }
    });
    event.stopPropagation();
  }
  complete_item(event, item_id, done, bucketlist) {
    done = !done;
    if (done) {
      const self = this;
      swal({
        title: 'Are You Sure?',
        text: 'are you sure you have achieved this?!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#5aaa3d',
        confirmButtonText: 'Yes, Damn it!',
        width: '700px',
        customClass: 'confirmationBox'
      }).then(function (isConfirm) {
        if (isConfirm) {
          let btn = document.getElementById(item_id);
          btn.textContent = self.item_status(done);
          self.changeItemStatus(item_id, bucketlist.id);
        }
      }, function (dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
          swal({
            title: 'Cheating Bastard...',
            text: 'You only cheating yourself...',
            type: 'error',
            timer: 1500,
            confirmButtonColor: '#5aaa3d'
          }).catch(error => console.log('Error: ', error));
        }
      });
    }
    event.stopPropagation();
  }
  async changeItemStatus(item_id, bucketlist_id) {
    let data: any;
    await this.api_service.completeItem(item_id, bucketlist_id).then(res => {
      let data = res.json();
      if (res.status === 201) {
        swal({
          title: 'Complete Item',
          text: 'Item Completed Successfully.',
          type: 'success',
          timer: 3500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        this.fetchBucketlists();
      } else {
        swal({
          title: 'Complete Item',
          text: res.status + '  ' + data.message,
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      }
    });
  }
  scroll_detector () {
    let display_port = document.getElementsByClassName('mainView')[0];
    if (display_port.scrollHeight > display_port.clientHeight) {
      this.scrollable = true;
      if ((display_port.scrollHeight - display_port.scrollTop - display_port.clientHeight) > 0) {
        document.getElementsByClassName('scroll-indicator-bottom')[0].classList.remove('scroll-bottom');
      } else {
        document.getElementsByClassName('scroll-indicator-bottom')[0].classList.add('scroll-bottom');
      }
    } else {
      this.scrollable = false;
    }
    if (display_port.scrollTop === 0) {
      this.scrolled_top = true;
    } else {
      this.scrolled_top = false;
    }
  }
  timeDisplay(date) {
    let time = new Date(date + ' UTC');
    return time.getTime();
  }

  editing_item_name(event)  {
    console.log('Single click');
    event.target.select();
    event.stopPropagation();
  }
  saveChanges(event, item_id, bucketlist_id) {
    console.log('SAVED?: ', item_id, 'NEW VALUE: ', event.target.value);
    if (event.target.value === '') {
      console.log('BLANK!');
      swal({
        title: 'ERROR!',
        text: 'New item name cannot be blank!',
        type: 'error'
      }).catch(error => console.log('Error: ', error));
      return;
    }
    console.log('ITEM: ', bucketlist_id);
    this.editRowId = any;

    const self = this;
    swal({
      title: 'Save Changes?',
      text: 'Do you want to save the new list name?!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#5aaa3d',
      confirmButtonText: 'Yes, Damn it!',
      width: '700px',
      customClass: 'confirmationBox'
    }).then(function (isConfirm) {
      if (isConfirm) {
        self.commitItemNameEdit(item_id, bucketlist_id, event.target.value);
      }
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal({
          title: 'Changes Dismissed',
          text: 'Changes wont be saved!',
          type: 'error',
          timer: 1500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        }
      });
    event.stopPropagation();
  }
  async commitItemNameEdit(item_id, bucketlist_id, new_name) {
    console.log('DETAILS: ', item_id, bucketlist_id, new_name);
    let data: any;
    await this.api_service.editItemName(item_id, bucketlist_id, new_name).then(res => {
      let data = res.json();
      if (res.status === 201) {
        swal({
          title: 'Save Changes to Item Name',
          text: 'Item Name Updated Successfully.',
          type: 'success',
          timer: 3500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
        // this.fetchBucketlists();
      } else if (res.status === 409) {
        swal({
          title: 'Save Changes to Item Name',
          text: 'Changes Not Saved: New name is same as previous one',
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      } else {
        swal({
          title: 'Save Changes to Item Name',
          text: res.status + '  ' + data.message,
          type: 'error',
          timer: 5500,
          confirmButtonColor: '#5aaa3d'
        }).catch(error => console.log('Error: ', error));
      }
    });
  }
}
