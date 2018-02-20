import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { FiwooService } from './pages/services/fiwoo.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private fiwooService: FiwooService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.fiwooService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.fiwooService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['../auth/login']);
    return false;
  }
}