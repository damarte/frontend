"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ng2_smart_table_1 = require("ng2-smart-table");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var RolesComponent = /** @class */ (function () {
    function RolesComponent(_templatesService, http, datePipe, _fiwooService) {
        this._templatesService = _templatesService;
        this.http = http;
        this.datePipe = datePipe;
        this._fiwooService = _fiwooService;
        this.settings = {
            mode: 'external',
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
            "delete": {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true
            },
            columns: {
                name: {
                    title: 'Name:',
                    type: 'string'
                },
                description: {
                    title: 'Description:',
                    type: 'string'
                },
                resources: {
                    title: "Resources",
                    valuePrepareFunction: function (resources) {
                        return resources.map(function (s) { return " " + s.name + " "; }).toString();
                    },
                    filterFunction: function (resources, search) {
                        var match = resources.map(function (s) { return s.name; }).indexOf(search) > -1;
                        if (match || search === '') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        };
        this.source = new ng2_smart_table_1.LocalDataSource();
        this.loadRoles();
    }
    RolesComponent.prototype.onModalHidden = function (reload) {
        if (reload) {
            this.loadRoles();
        }
    };
    RolesComponent.prototype.loadRoles = function () {
        var _this = this;
        this._fiwooService.getRoles().subscribe(function (data) {
            _this.source.load(data);
        }, function (err) {
            console.log(err);
        });
    };
    RolesComponent.prototype.onDeleteConfirm = function (event) {
        var _this = this;
        sweetalert2_1["default"]({
            title: 'Are you sure you want to delete the role?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                _this._fiwooService.deleteRol(event.data.id).subscribe(function (res) {
                    console.log(res);
                    _this.loadRoles();
                });
                sweetalert2_1["default"]('Deleted!', 'Your role has been deleted.', 'success');
            }
        });
    };
    RolesComponent = __decorate([
        core_1.Component({
            selector: 'app-roles',
            templateUrl: './roles.component.html',
            styleUrls: ['./roles.component.scss'],
            providers: [common_1.DatePipe]
        })
    ], RolesComponent);
    return RolesComponent;
}());
exports.RolesComponent = RolesComponent;
