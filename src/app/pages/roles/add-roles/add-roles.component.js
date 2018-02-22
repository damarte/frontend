"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var context;
var AddRolesComponent = /** @class */ (function () {
    function AddRolesComponent(devicesService, http, _fiwooService) {
        this.devicesService = devicesService;
        this.http = http;
        this._fiwooService = _fiwooService;
        this.onHidden = new core_1.EventEmitter();
        this.role = {};
        this.urlBase = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
        this.editedRole = null;
        this.modalTitle = "";
        // validations
        this.nameFormControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.descriptionFormControl = new forms_1.FormControl();
        this.resourceFormControl = new forms_1.FormControl();
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.showValue = false;
        this.saved = false;
        context = this;
        this.getResources();
    }
    AddRolesComponent.prototype.getResources = function () {
        var _this = this;
        this._fiwooService.getResources().subscribe(function (data) {
            var resources = data;
            _this.resources = resources;
        }, function (err) {
            console.log(err);
        });
    };
    AddRolesComponent.prototype.ngOnInit = function () {
    };
    AddRolesComponent.prototype.cleanValues = function () {
        this.name = "";
        this.description = "";
        this.resourceSelected = [];
    };
    AddRolesComponent.prototype.showModal = function (role) {
        this.editedRole = role;
        this.configureRoleToEdit();
        this.saved = false;
        this.modal.modal({
            closable: true,
            onHidden: function () {
                context.cleanValues();
                context.onHidden.emit(true);
            }
        })
            .modal('show');
    };
    AddRolesComponent.prototype.configureRoleToEdit = function () {
        if (this.editedRole != null) {
            this.modalTitle = "Edit Role";
            this.name = this.editedRole.name;
            this.description = this.editedRole.description;
            this.resourceSelected = [this.editedRole.resources];
        }
        else {
            this.modalTitle = "Add Role";
        }
    };
    AddRolesComponent.prototype.hideModal = function () {
        this.modal.modal('hide');
    };
    // tslint:disable-next-line:use-life-cycle-interface
    AddRolesComponent.prototype.ngAfterViewInit = function () {
        this.modal = jQuery(this.addRoleModalRef.nativeElement);
    };
    AddRolesComponent.prototype.sendRole = function () {
        var _this = this;
        if (!this.nameFormControl.hasError('required') &&
            !this.descriptionFormControl.hasError('required')) {
            var allResources = [];
            if (this.resourceSelected instanceof Array) {
                allResources = this.resourceSelected;
            }
            else {
                allResources = [this.resourceSelected];
            }
            this.role = {
                name: this.name,
                description: this.description,
                resources: allResources
            };
            if (this.editedRole != undefined) {
                // PUT
                console.log(JSON.stringify(this.role));
                this._fiwooService.updateRol(this.editedRole.id, this.role).subscribe(function (res) {
                    console.log(res);
                    _this.saved = true;
                    _this.hideModal();
                });
            }
            else {
                // POST
                this.role = {
                    name: this.name,
                    description: this.description,
                    resources: allResources
                };
                console.log(JSON.stringify(this.role));
                this._fiwooService.postRol(this.role).subscribe(function (res) {
                    console.log(res);
                });
            }
            this.hideModal();
        }
    };
    __decorate([
        core_2.ViewChild('addRoleModal')
    ], AddRolesComponent.prototype, "addRoleModalRef");
    __decorate([
        core_1.Output()
    ], AddRolesComponent.prototype, "onHidden");
    AddRolesComponent = __decorate([
        core_2.Component({
            selector: 'app-add-roles',
            templateUrl: './add-roles.component.html',
            styleUrls: ['./add-roles.component.scss']
        })
    ], AddRolesComponent);
    return AddRolesComponent;
}());
exports.AddRolesComponent = AddRolesComponent;
