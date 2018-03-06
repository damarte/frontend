import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from "@angular/common";
import { FiwooService } from "../services/fiwoo.service";
import swal from "sweetalert2";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  providers: [DatePipe, FiwooService]
})
export class UsersComponent {
  outputs: string;

  settings = {
    mode: "external",
    actions: {
      add: false
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      email: {
        title: "Email:",
        type: "string"
      },
      username: {
        title: "Username:",
        type: "string"
      },
      name: {
        title: "Name",
        type: "string"
      },
      surname: {
        title: "Surname",
        type: "string"
      },
      roles: {
        title:"Role",
        valuePrepareFunction: (roles) => {
          return roles.map(s => " " + s.name + " ").toString()
        },
        filterFunction(roles?: any, search?: string): boolean {
          let match = roles.map(s => s.name).indexOf(search) > -1
          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private _fiwooService: FiwooService) {
    this.loadUsers();
  }

  onModalHidden(reload) {
    //Recargamos los templates
    if (reload) {
      this.loadUsers();
    }
  }

  private loadUsers() {
    this._fiwooService.getUsers().subscribe(
      data => {
        this.source.load(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Are you sure you want to delete this user?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._fiwooService.deleteUser(event.data.id).subscribe(res => {
          console.log(res);
          this.loadUsers();
        });
        swal(
          'Deleted!',
          'Your user has been deleted.',
          'success'
        )
      }
    });
  }
}
