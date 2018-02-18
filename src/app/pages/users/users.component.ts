import { Component } from '@angular/core';
import { DevicesService, Template } from 'iot_devices_fiwoo';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]
})


export class UsersComponent {

  outputs: string;

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
      email: {
        title: 'Email:',
        type: 'string',
      },
      username: {
        title: 'Username:',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      surname: {
        title: 'Surname',
        type: 'string',
      },      
      gender: {
        title: 'Gender',
        type: 'string'
      },     
      date_of_birth: {
        title: 'Date of birth',
        type: 'string',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);  
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted; 
        }
      },              
    }, 
  };


  source: LocalDataSource = new LocalDataSource();
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  constructor(private _templatesService: DevicesService,              
              private http: Http,
              private datePipe: DatePipe ) {
    this.loadTemplates();
  }
 

  onModalHidden(reload){
    //Recargamos los templates
    if (reload){
     this.loadTemplates();
    }
  }

  private loadTemplates():void{    
    this.http.get(`${this.urlBase}/users`).subscribe(
      data => {          
          let users: any[] = data.json(); 
         /* users.forEach(element => {
            this.source.prepend(element);     
          });     */
          
          this.source.load(users);
          console.log('getUsers: ', users);  
        },
      err => {        
        console.log(err);          
      } 
    );  
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete the user: '+event.data.name+' ?')) {
      event.confirm.resolve();
      //Call service to delete this user
      this.http.delete(`${this.urlBase}/users/${event.data.id}`).subscribe(res => {
        console.log(res);
      },
    );
    } else {
      event.confirm.reject();
    }
  }  
}
