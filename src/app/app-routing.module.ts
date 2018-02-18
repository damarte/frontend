import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbAuthComponent, NbLoginComponent, NbRegisterComponent, NbResetPasswordComponent } from './auth/index';
import { TermsComponent } from './auth/components/terms/terms.component';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },     
      {
        path: 'register',
        component: NbRegisterComponent
      },
      {
        path: 'reset-password', 
        component: NbResetPasswordComponent
      },
      {
        path: 'terms-and-conditions',
        component: TermsComponent
      },

    ],
  },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
