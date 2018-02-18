import { Component } from "@angular/core";
import { DevicesService, Template } from "iot_devices_fiwoo";
import { LocalDataSource } from "ng2-smart-table";
import { Output } from "@angular/core/src/metadata/directives";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Http } from "@angular/http";
import { DatePipe } from "@angular/common";
import { FiwooService } from "../services/fiwoo.service";

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
      gender: {
        title: "Gender",
        type: "string"
      },
      date_of_birth: {
        title: "Date of birth",
        type: "string",
        valuePrepareFunction: date => {
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, "dd MMM yyyy");
          return formatted;
        }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private _templatesService: DevicesService,
    private http: Http,
    private datePipe: DatePipe,
    private _fiwooService: FiwooService
  ) {
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
    if (
      window.confirm(
        "Are you sure you want to delete the user: " + event.data.name + " ?"
      )
    ) {
      this._fiwooService.deleteUser(event.data.id).subscribe(res => {
        console.log(res);
      });
    }
  }
}
