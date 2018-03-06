import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import swal from "sweetalert2";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [DatePipe]
})
export class NotificationsComponent {

  router: any;

  settings = {
    mode: 'external',
    actions: {
      add: false
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Notification id:',
        type: 'number',
      },
      subject: {
        title: 'Subject',
        type: 'string',
      },
      message: {
        title: 'Message',
        type: 'string',
      },
      via: {
        title: 'Send via',
        type: 'boolean',
      },
      roles: {
        title: 'Roles to send',
        type: 'boolean',
      },
      contacts: {
        title: 'Contacts to send',
        type: 'boolean',
      },
      sendAt: {
        title: 'Send at',
        type: 'number',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;
        }
      },


    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private datePipe: DatePipe) {
      //  this.loadAssets();
  }



  // private loadAssets() {
  //   this._fiwooService.getAssets().subscribe(
  //     data => {
  //       this.source.load(data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  onModalHidden(reload){
    if (reload){
    //  this.loadAssets();
    }
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete the notification?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        // this._fiwooService.deleteAsset(event.data.id).subscribe(res => {
        //   console.log(res);
        //   this.loadAssets();
        // });
        this.source.refresh();
        swal(
          'Deleted!',
          'Your notification has been deleted.',
          'success'
        )
      }
    });
  }
}
