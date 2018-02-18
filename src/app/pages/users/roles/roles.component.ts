import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RolesService } from 'um_fiwoo';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: []
})


export class RolesComponent {
  router: any;

  settings = {    
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
        title: 'Rol id:',
        type: 'number',
      },     
      name: {
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },     
    }, 
  };
 


  



  source: LocalDataSource = new LocalDataSource();
  urlBase: string = 'https://platform.fiwoo.eu/api/user-management/users';

  constructor(private _rolesService: RolesService,              
              private http: Http) { 
        
      /* Connect with SDK
      const data = this._usersService.getUsers().subscribe(res => {       
      this.source.prepend(res);
      console.log(res);
      });*/

       this.getRoles();  
  }

  

  private getRoles(){   
  
    this.http.get(`${this.urlBase}/roles`).subscribe(
      data => {
          
          let roles: any[] = data.json(); 

          roles.forEach(element => {
            this.source.prepend(element);   
          });                      

          console.log('getRoles: ', roles);      

        },
      err => {        
        console.log(err);          
      } 
    );  
  } 

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete the role: '+event.data.name+' ?')) {
      event.confirm.resolve();
      // Call service to delete this role
      this.http.delete(`${this.urlBase}/roles/${event.data.id}`).subscribe(res => {
        console.log(res);
      },
    );
    } else {
      event.confirm.reject();
    }
  }

  // add
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {    
      
      let body = {          
        "name": event.newData.name,
        "description": event.newData.description,
        "resources": []           
      }

      this.http.post(`${this.urlBase}/roles`, body).subscribe(res => {
        
        event.confirm.resolve(event.newData);
      });

    } else {
      event.confirm.reject();
    }
  }



  // update 
  onSaveConfirm(event) {
    
    let body = {  
      "id": event.newData.id,
      "name": event.newData.name,
      "description": event.newData.description,
      "resources": []        
    }

  this.http.put(`${this.urlBase}/roles/${event.data.id}`, body).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
 

}
