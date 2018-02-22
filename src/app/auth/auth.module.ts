import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthService } from './services/auth.service';
import { NbDummyAuthProvider } from './providers/dummy-auth.provider';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';
import {
  defaultSettings,
  NB_AUTH_USER_OPTIONS_TOKEN,
  NB_AUTH_OPTIONS_TOKEN,
  NB_AUTH_PROVIDERS_TOKEN,
  NB_AUTH_TOKEN_WRAPPER_TOKEN,
  NbAuthOptions, NB_AUTH_INTERCEPTOR_HEADER,
} from './auth.options';
import { NbAuthComponent } from './components/auth.component';
import { NbAuthSimpleToken, NbTokenService } from './services/token.service';
import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';
import { routes } from './auth.routes';
import { deepExtend } from './helpers';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { TermsComponent } from './components/terms/terms.component';

// Social signin
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('352539043251-b5p0mmn23qam2qdajjvvfnimq9515ls0.apps.googleusercontent.com')
  },
  /*{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('561602290896109')
  }*/
]);

export function provideConfig() {
  return config;
}



export function nbAuthServiceFactory(config: any, tokenService: NbTokenService, injector: Injector) {
  const providers = config.providers || {};

  for (const key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      const object = injector.get(provider.service);
      object.setConfig(provider.config || {});
    }
  }

  return new NbAuthService(tokenService, injector, providers);
}

export function nbOptionsFactory(options) {
  return deepExtend(defaultSettings, options);
}

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule.initialize(config),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  declarations: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
    TermsComponent,
  ],
  exports: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
  ],
})


export class NbAuthModule {
  static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbAuthModule,
      providers: [
        { provide: NB_AUTH_USER_OPTIONS_TOKEN, useValue: nbAuthOptions },
        { provide: NB_AUTH_OPTIONS_TOKEN, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS_TOKEN] },
        { provide: NB_AUTH_PROVIDERS_TOKEN, useValue: {} },
        { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        {
          provide: NbAuthService,
          useFactory: nbAuthServiceFactory,
          deps: [NB_AUTH_OPTIONS_TOKEN, NbTokenService, Injector],
        },
        NbTokenService,
        NbDummyAuthProvider,
        NbEmailPassAuthProvider,
        { provide: AuthServiceConfig, useFactory: provideConfig }       
      ],
    };
  }
}
