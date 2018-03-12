import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from "@angular/router";
import { NbTokenService } from '../auth/services/token.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    protected router: Router,
    protected tokenService: NbTokenService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = req.headers.set('Accept', 'application/json');

    var token = localStorage.getItem('auth_app_token');
    if(token !== null) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    else{
      headers = headers.set('Authorization', 'Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G');
    }

    if(req.method == 'POST' || req.method == 'PUT'){
      if( req.url.indexOf('user-management/login') >= 0){
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
      }
      else{
        headers = headers.set('Content-Type', 'application/json');
      }
    }

    const dupReq = req.clone({ headers: headers });

    return next.handle(dupReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('Session expired');
          this.tokenService.clear();
          this.router.navigateByUrl('/');
        }
      }
    });
  }
};
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule {

}
