import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DevicesComponent } from './devices/devices.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersComponent } from "./users/users.component";
import { TemplatesComponent } from './templates/templates.component';
import { AddDevicesComponent } from './devices/add-devices/add-devices.component';
import { MatButtonModule, MatSelectModule, MatSlideToggleModule, MatCardModule,
MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatChipsModule, MatDialogModule, MatExpansionModule } from '@angular/material';
import { DialogOverviewExampleDialog } from './templates/add-template/add-template.component';
import { AddTemplateComponent } from './templates/add-template/add-template.component';
import { DevicesFilterComponent } from './devices/devices-filter/devices-filter.component';
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/about.service';
import { RolesComponent } from './users/roles/roles.component';
import { AssetsComponent } from './users/assets/assets.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({ 
  imports: [
    PagesRoutingModule,
    ThemeModule,    
    DashboardModule,
    Ng2SmartTableModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [
    AboutService
  ],
  declarations: [
    ...PAGES_COMPONENTS, 
    DevicesComponent, 
    UsersComponent,
    TemplatesComponent,
    AddDevicesComponent,
    AddTemplateComponent,
    DialogOverviewExampleDialog,
    DevicesFilterComponent,
    AboutComponent,
    RolesComponent,
    AssetsComponent
    
  ],
  entryComponents: [DialogOverviewExampleDialog],
})
export class PagesModule {
}
