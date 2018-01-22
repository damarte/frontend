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
import { ApiModule, Configuration, ConfigurationParameters } from 'dv_jig_test';
import { ApiModule as UmApiModule } from 'um_jig_test';
import { ApiModule as IotModule } from 'iot_jig_test';
import { NbAuthModule } from './auth/auth.module';
import { NbEmailPassAuthProvider } from './auth/providers/email-pass-auth.provider';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ApiModule.forRoot(apiConfigFactory),
    UmApiModule.forRoot(apiConfigFactory),
    IotModule.forRoot(apiConfigFactory),
    NgbModule.forRoot(),
    ThemeModule.forRoot(), 
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
        },
      },
      providers: {        
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: 'https://virtserver.swaggerhub.com/JIG_INTERNET/users-management/1.0.0/',
            login: {
              endpoint: '/users/login',
            },
            register: {
              endpoint: '/users',
            }, 
            logout: {
              endpoint: '/logout',
              redirect: {
                success: '/auth/login',
                failure: '/auth/login',
              },
            },
            requestPass: {
              endpoint: '/request-pass',
              redirect: {
                success: '/auth/reset-password',
              },
            },
            resetPass: {
              endpoint: '/reset-pass',
              redirect: {
                success: '/auth/login',
              },
            },
          },
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }    
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