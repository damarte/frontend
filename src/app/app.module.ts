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
import { ApiModule, Configuration, ConfigurationParameters } from 'dv_fiwoo';
import { ApiModule as UmApiModule } from 'um_fiwoo';  
import { ApiModule as IotModule } from 'iot_devices_fiwoo';
import { LoginComponent } from './login/login.component';
 

@NgModule({
  declarations: [AppComponent, LoginComponent],
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
    CoreModule.forRoot()  
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