/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiModule as UmApiModule } from 'um_fiwoo';
import { ApiModule as IotModule, Configuration, ConfigurationParameters } from 'iot_devices_fiwoo';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { NbAuthModule } from './auth/auth.module';
import { FiwooService } from './pages/services/fiwoo.service';
import { AuthGuard } from './auth-guard.service';
import { NbEmailPassAuthProvider } from './auth/providers/email-pass-auth.provider';
import { NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthSimpleToken } from '@nebular/auth';
import { InterceptorModule } from './interceptor/interceptor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InterceptorModule,
    // ApiModule.forRoot(apiConfigFactory),
    UmApiModule.forRoot(apiConfigFactory),
    IotModule.forRoot(apiConfigFactory),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            token: {
              key: 'access_token', // this parameter tells Nebular where to look for the token
            },
          },
        },
      },
      forms: {
        login: {
          redirectDelay: 0,
        },
        requestPassword: {
          redirectDelay: 6000,
        },
        resetPass: {
          redirectDelay: 6000,
          validation:  {
            oldPassword: {
              required: true,
            }
          }
        },
      },

    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    FiwooService,
    AuthGuard,
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useValue: NbAuthSimpleToken },
  ],
})
export class AppModule {
}


export function apiConfigFactory () {
  const params: ConfigurationParameters = {
    apiKeys: {
      Authorization: 'fiwoo'
    }
  };
  return new Configuration(params);
}
