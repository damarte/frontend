import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetsService } from 'um_fiwoo';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers: []
})


export class AssetsComponent {
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
        title: 'Asset id:',
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
      type: {
        title: 'Type',
        type: 'boolean',
      },
     /* parent: {
        title: 'Parent',
        type: 'string',
      },
      childrens: {
        title: 'Childrens',
        type: 'string'
      }*/
         
    }, 
  };





  source: LocalDataSource = new LocalDataSource();
  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  constructor(private _assetsService: AssetsService,              
              private http: Http) { 
        
      /* Connect with SDK
      const data = this._usersService.getUsers().subscribe(res => {       
      this.source.prepend(res);
      console.log(res);
      });*/

       this.getAssets();  
  }

  

  private getAssets(){   
  
    this.http.get(`${this.urlBase}/assets`).subscribe(
      data => {
          
          let assets: any[] = data.json(); 

          assets.forEach(element => {
            this.source.prepend(element);   
          });                      

          console.log('getAssets: ', assets);      

        },
      err => {        
        console.log(err);          
      } 
    );  
  } 

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete the asset: '+ event.data.name +' ?')) {
      event.confirm.resolve();
      // Call service to delete this role
      this.http.delete(`${this.urlBase}/assets/${event.data.id}`).subscribe(res => {
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
        "id": event.newData.id,
        "name": event.newData.name,
        "description": event.newData.description,
        "type": event.newData.type,
        "parents": [],
        "childrens": []    
      }

      this.http.post(`${this.urlBase}/assets`, body).subscribe(res => {
        
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
      "type": event.newData.type,
      "parents": [],
      "childrens": [] 
    }

  this.http.put(`${this.urlBase}/assets/${event.data.id}`, body).subscribe(
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
