import { Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';;
import { FiwooService } from '../../services/fiwoo.service';

declare var jQuery: any;
var context: any;

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss']
})


export class AddAssetsComponent implements OnInit {

  @ViewChild('addAssetsModal') addAssetsModalRef: ElementRef;

  @Output() onHidden = new EventEmitter<boolean>();

  modal: any;

  asset: any = {};

  name: string;
  description: string;
  type: string;
  assetParentSelected: any = [];
  assetChildrenSelected: any = [];

  urlBase: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

  editedAsset:any = null;
  modalTitle: string = "";

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);
  typeFormControl = new FormControl('', [
    Validators.required
  ]);
  assetChildrenFormControl = new FormControl('', [
    Validators.required
  ]);
  assetParentFormControl = new FormControl('', [
    Validators.required
  ]);



  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  showValue: boolean = false;

  saved: boolean = false;

  constructor(private _fiwooService: FiwooService) {
    context = this;
    this.getAssets();
  }

  genders:any = ['Male', 'Female'];

  roles: any[];
  assets: any[];

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }


  private getAssets(){

    this._fiwooService.getAssets().subscribe(
      data => {
        let assets: any[] = data;
        this.assets = assets;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  cleanValues (){

    this.name = "";
    this.description = "";
    this.type = "";

    this.assetChildrenSelected = [];
    this.assetParentSelected = [];

  }


  showModal(asset) {
    this.editedAsset = asset;

    this.configureAssetToEdit();

    this.saved = false;
    this.modal.modal({
      closable  : true,
      onHidden  : function(){
        context.cleanValues();
        context.onHidden.emit(true);
      }
    })
    .modal('show');
  }

  configureAssetToEdit(){

    if (this.editedAsset != null){

      this.modalTitle = "Edit Asset";
      this.name = this.editedAsset.name;
      this.description = this.editedAsset.description;
      this.type = this.editedAsset.type;
      this.assetChildrenSelected = this.editedAsset.childrens;
      this.assetParentSelected= this.editedAsset.parents;
    }else{
      this.modalTitle = "Add Asset"
    }
  }

  hideModal() {
    this.modal.modal('hide');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.modal = jQuery(this.addAssetsModalRef.nativeElement);
  }


  sendAsset(){

    if (!this.nameFormControl.hasError('required') &&
        !this.descriptionFormControl.hasError('required') &&
        !this.typeFormControl.hasError('required')){

        let assetsChildren = [];
        let assetsParent = [];

        if (this.assetChildrenSelected instanceof Array) {
          assetsChildren = this.assetChildrenSelected;
        } else {
          assetsChildren = [this.assetChildrenSelected];
        }

        if (this.assetParentSelected instanceof Array) {
          assetsParent = this.assetParentSelected;
        } else {
          assetsParent = [this.assetParentSelected];
        }

        this.asset = {
          name: this.name,
          description: this.description,
          type: this.type,
          parents: assetsParent,
          childrens: assetsChildren
        };

        if (this.editedAsset != undefined){

          // PUT
          console.log(JSON.stringify(this.asset));

          this._fiwooService.updateAsset(this.editedAsset.id, this.asset).subscribe(
            res => {
              console.log(res);
              this.saved = true;
              this.hideModal();
          });

        }else{

          console.log(JSON.stringify(this.asset));

          this._fiwooService.postAsset(this.asset).subscribe(
            res => {
              console.log(res);
          });

        }

        this.hideModal();


    }
  }
}
