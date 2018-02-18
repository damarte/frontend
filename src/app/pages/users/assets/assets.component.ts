import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetsService } from 'um_fiwoo';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { FiwooService } from "../../services/fiwoo.service";


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers: []
})


export class AssetsComponent {
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
 

  constructor(private _assetsService: AssetsService,              
              private http: Http,
              private _fiwooService: FiwooService) { 
       this.loadAssets();  
  }

  

  private loadAssets() {
    this._fiwooService.getAssets().subscribe(
      data => {
        this.source.load(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onModalHidden(reload){   
    if (reload){
     this.loadAssets();
    }
  }

  onDeleteConfirm(event): void {
    if (
      window.confirm(
        "Are you sure you want to delete the asset: " + event.data.name + " ?"
      )
    ) {
      this._fiwooService.deleteAsset(event.data.id).subscribe(res => {
        console.log(res);
      });
    }
  }
}
