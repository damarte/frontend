import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { TemplatesComponent } from './templates/templates.component';
import { AboutComponent } from './about/about.component';
import { RolesComponent } from './roles/roles.component';
import { AssetsComponent } from './assets/assets.component';
import { ModelsComponent } from './models/models.component';
import { StatementsComponent } from './statements/statements.component';
import { OpenDataComponent } from './open-data/open-data.component';
import { RoutesComponent } from './routes/routes.component';



const routes: Routes = [  
  {
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'devices',
      component: DevicesComponent,
    },
    {
      path: 'templates',
      component: TemplatesComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    { 
      path: 'users', 
      component: UsersComponent, 
    },
    { 
      path: 'roles', 
      component: RolesComponent, 
    },
    { 
      path: 'assets', 
      component: AssetsComponent, 
    },    
    { 
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'about',
      component: AboutComponent,
    },
    {
      path: 'models',
      component: ModelsComponent,
    },
    {
      path: 'statements',
      component: StatementsComponent,
    }, 
    {        
      path: 'open-data',
      component: OpenDataComponent,
    },
    {
      path: 'routes',
      component: RoutesComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
