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
var AddUsersComponent = /** @class */ (function () {
    function AddUsersComponent(devicesService, http, _fiwooService) {
        this.devicesService = devicesService;
        this.http = http;
        this._fiwooService = _fiwooService;
        this.onHidden = new core_1.EventEmitter();
        this.user = {};
        this.urlBase = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
        this.editedUser = null;
        this.modalTitle = "";
        this.nameFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.surnameFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.usernameFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.passwordFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.confirmPasswordFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.genderFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.roleFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.assetFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.birthFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.showValue = false;
        this.saved = false;
        this.genders = ['Male', 'Female'];
        context = this;
        this.getRoles();
        this.getAssets();
    }
    AddUsersComponent.prototype.getRoles = function () {
        var _this = this;
        this._fiwooService.getRoles().subscribe(function (data) {
            var roles = data;
            _this.roles = roles;
        }, function (err) {
            console.log(err);
        });
    };
    AddUsersComponent.prototype.getAssets = function () {
        var _this = this;
        this._fiwooService.getAssets().subscribe(function (data) {
            var assets = data;
            _this.assets = assets;
        }, function (err) {
            console.log(err);
        });
    };
    AddUsersComponent.prototype.ngOnInit = function () {
    };
    AddUsersComponent.prototype.cleanValues = function () {
        this.name = "";
        this.surname = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.genderSelected = "";
        this.roleSelected = [];
        this.assetSelected = [];
        this.date_of_birth = null;
    };
    AddUsersComponent.prototype.showModal = function (user) {
        this.editedUser = user;
        this.configureUserToEdit();
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
    AddUsersComponent.prototype.configureUserToEdit = function () {
        if (this.editedUser != null) {
            this.modalTitle = "Edit User";
            this.name = this.editedUser.name;
            this.surname = this.editedUser.surname;
            this.username = this.editedUser.username;
            this.email = this.editedUser.email;
            this.password = this.editedUser.password;
            this.confirmPassword = this.editedUser.password;
            this.genderSelected = this.editedUser.gender;
            this.roleSelected = this.editedUser.roles;
            this.assetSelected = this.editedUser.assets;
            this.date_of_birth = this.editedUser.date_of_birth;
        }
        else {
            this.modalTitle = "Add User";
        }
    };
    AddUsersComponent.prototype.hideModal = function () {
        this.modal.modal('hide');
    };
    // tslint:disable-next-line:use-life-cycle-interface
    AddUsersComponent.prototype.ngAfterViewInit = function () {
        this.modal = jQuery(this.addTemplateModalRef.nativeElement);
        // select multiple
        jQuery('.dropdown1').dropdown();
    };
    AddUsersComponent.prototype.sendTemplate = function () {
        var _this = this;
        //TODOD VALIDATIONS
        console.log('Edited User: ', this.editedUser);
        if (!this.nameFormControl.hasError('required') &&
            !this.surnameFormControl.hasError('required') &&
            !this.usernameFormControl.hasError('required') &&
            !this.emailFormControl.hasError('required') &&
            !this.passwordFormControl.hasError('required') &&
            // !this.roleFormControl.hasError('required') &&
            // !this.assetFormControl.hasError('required') && 
            !this.genderFormControl.hasError('required') &&
            this.password == this.confirmPassword) {
            var allRoles = [];
            if (this.roleSelected instanceof Array) {
                allRoles = this.roleSelected;
            }
            else {
                allRoles = [this.roleSelected];
            }
            var allAssets = [];
            if (this.assetSelected instanceof Array) {
                allAssets = this.assetSelected;
            }
            else {
                allAssets = [this.assetSelected];
            }
            this.user = {
                name: this.name,
                surname: this.surname,
                username: this.username,
                email: this.email,
                password: this.password,
                roles: allRoles,
                assets: allAssets,
                gender: this.genderSelected,
                date_of_birth: this.changeDate(this.date_of_birth)
                // date_of_birth: this.date_of_birth     
            };
            if (this.editedUser != undefined) {
                // PUT
                console.log(JSON.stringify(this.user));
                this._fiwooService.updateUser(this.editedUser.id, this.user).subscribe(function (res) {
                    console.log(res);
                    _this.saved = true;
                    _this.hideModal();
                });
            }
            else {
                // POST
                this.user = {
                    name: this.name,
                    surname: this.surname,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    roles: allRoles,
                    assets: allAssets,
                    gender: this.genderSelected,
                    date_of_birth: this.changeDate(this.date_of_birth)
                    // date_of_birth: this.date_of_birth
                };
                console.log(JSON.stringify(this.user));
                this._fiwooService.postUser(this.user).subscribe(function (res) {
                    console.log(res);
                });
            }
            this.hideModal();
        }
    };
    AddUsersComponent.prototype.changeDate = function (date) {
        var days;
        var months;
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        days = dd + '';
        months = mm + '';
        if (dd < 10) {
            days = '0' + dd;
        }
        if (mm < 10) {
            months = '0' + mm;
        }
        return yyyy + '-' + months + '-' + days;
    };
    __decorate([
        core_2.ViewChild('addTemplateModal')
    ], AddUsersComponent.prototype, "addTemplateModalRef");
    __decorate([
        core_1.Output()
    ], AddUsersComponent.prototype, "onHidden");
    AddUsersComponent = __decorate([
        core_2.Component({
            selector: 'app-add-users',
            templateUrl: './add-users.component.html',
            styleUrls: ['./add-users.component.scss']
        })
    ], AddUsersComponent);
    return AddUsersComponent;
}());
exports.AddUsersComponent = AddUsersComponent;
