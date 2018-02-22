"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var headers = new http_1.Headers();
var token;
var auth;
var FiwooService = /** @class */ (function () {
    function FiwooService(http) {
        this.http = http;
        // urlBaseUser: string = 'https://platform.fiwoo.eu/api/user-management/users';  
        // urlLogin: string = 'https://us1.fiwoo.eu:7000/users'; 
        this.urlBaseUser = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
        this.urlLogin = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
        token = localStorage.getItem('access_token');
        auth = 'Bearer ' + token;
        auth = auth.replace(/"([^"]+(?="))"/g, '$1');
        console.log('Headers: ', headers);
    }
    FiwooService.prototype.configureGET = function () {
        headers = new http_1.Headers();
        headers.append('Authorization', auth);
    };
    FiwooService.prototype.configureLogin = function () {
        headers = new http_1.Headers();
        headers.append("Authorization", "Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G");
    };
    FiwooService.prototype.configureOthers = function () {
        headers = new http_1.Headers();
        headers.append('Authorization', auth);
        headers.append('Content-Type', 'application/json');
    };
    // users service
    // LOGIN
    FiwooService.prototype.doLogin = function (login) {
        this.configureLogin();
        return this.http.post(this.urlLogin + "/login", login, { headers: headers });
    };
    // LOGOUT
    FiwooService.prototype.doLogout = function () {
        this.configureGET();
        return this.http.get(this.urlLogin + "/users/logout", { headers: headers });
    };
    // GET USERS
    FiwooService.prototype.getMe = function () {
        this.configureGET();
        return this.http.get(this.urlBaseUser + "/me", { headers: headers }).map(function (res) { return res.json(); });
    };
    // GET USERS
    FiwooService.prototype.getUsers = function () {
        this.configureGET();
        return this.http.get(this.urlBaseUser + "/users", { headers: headers }).map(function (res) { return res.json(); });
    };
    // POST USERS
    FiwooService.prototype.postUser = function (user) {
        this.configureOthers();
        return this.http.post(this.urlBaseUser + "/users", user, { headers: headers });
    };
    // PUT USERS
    FiwooService.prototype.updateUser = function (user_id, user) {
        this.configureOthers();
        return this.http.put(this.urlBaseUser + "/users/" + user_id, user, { headers: headers });
    };
    // DELETE USERS
    FiwooService.prototype.deleteUser = function (user_id) {
        this.configureOthers();
        return this.http["delete"](this.urlBaseUser + "/users/" + user_id, { headers: headers });
    };
    // assets service
    // GET ASSETS
    FiwooService.prototype.getAssets = function () {
        this.configureGET();
        return this.http.get(this.urlBaseUser + "/assets", { headers: headers }).map(function (res) { return res.json(); });
    };
    // POST ASSETS
    FiwooService.prototype.postAsset = function (asset) {
        this.configureOthers();
        return this.http.post(this.urlBaseUser + "/assets", asset, { headers: headers });
    };
    // PUT ASSETS
    FiwooService.prototype.updateAsset = function (asset_id, asset) {
        this.configureOthers();
        return this.http.put(this.urlBaseUser + "/assets/" + asset_id, asset, { headers: headers });
    };
    // DELETE ASSETS
    FiwooService.prototype.deleteAsset = function (asset_id) {
        this.configureOthers();
        return this.http["delete"](this.urlBaseUser + "/assets/" + asset_id, { headers: headers });
    };
    // roles service
    // GET ROLES
    FiwooService.prototype.getRoles = function () {
        this.configureGET();
        return this.http.get(this.urlBaseUser + "/roles", { headers: headers }).map(function (res) { return res.json(); });
    };
    // POST ROLES
    FiwooService.prototype.postRol = function (rol) {
        this.configureOthers();
        return this.http.post(this.urlBaseUser + "/roles", rol, { headers: headers });
    };
    // PUT ROLES
    FiwooService.prototype.updateRol = function (rol_id, rol) {
        this.configureOthers();
        return this.http.put(this.urlBaseUser + "/roles/" + rol_id, rol, { headers: headers });
    };
    // DELETE ROLES
    FiwooService.prototype.deleteRol = function (rol_id) {
        this.configureOthers();
        return this.http["delete"](this.urlBaseUser + "/roles/" + rol_id, { headers: headers });
    };
    // resources service
    // GET RESOURCES
    FiwooService.prototype.getResources = function () {
        this.configureGET();
        return this.http.get(this.urlBaseUser + "/resources", { headers: headers }).map(function (res) { return res.json(); });
    };
    FiwooService = __decorate([
        core_1.Injectable()
    ], FiwooService);
    return FiwooService;
}());
exports.FiwooService = FiwooService;
