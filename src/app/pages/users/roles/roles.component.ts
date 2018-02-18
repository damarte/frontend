import { Component } from '@angular/core';
import { DevicesService, Template } from 'iot_devices_fiwoo';
import { LocalDataSource } from 'ng2-smart-table';
import { Output } from '@angular/core/src/metadata/directives';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [DatePipe]
})


export class RolesComponent {

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
      name: {
        title: 'Name:',
        type: 'string',
      },
      description: {
        title: 'Description:',
        type: 'string',
      },
      resources: {
        title: 'Resources',
        type: 'string',
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
    this.http.get(`${this.urlBase}/roles`).subscribe(
      data => {          
          let roles: any[] = data.json(); 
         /* roles.forEach(element => {
            this.source.prepend(element);   
          });     */
          
          this.source.load(roles);
          console.log('getRoles: ', roles);  
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
      this.http.delete(`${this.urlBase}/roles/${event.data.id}`).subscribe(res => {
        console.log(res);
      },
    );
    } else {
      event.confirm.reject();
    }
  }  
}
