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
MatIconModule, MatInputModule, MatListModule, MatGridListModule, MatRadioModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatDatepickerModule } from '@angular/material';
import { DialogOverviewExampleDialog } from './templates/add-template/add-template.component';
import { AddTemplateComponent } from './templates/add-template/add-template.component';
import { DevicesFilterComponent } from './devices/devices-filter/devices-filter.component';
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/about.service';
import { RolesComponent } from './roles/roles.component';
import { AssetsComponent } from './assets/assets.component';
import { EditDevicesComponent } from './devices/edit-devices/edit-devices.component';
import { RouterModule } from '@angular/router'
import { AddUsersComponent } from './users/add-users/add-users.component';
import { AddAssetsComponent } from './assets/add-assets/add-assets.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';
import { HttpClientModule } from '@angular/common/http';
import { FiwooService } from './services/fiwoo.service';
import { ModelsComponent } from './models/models.component';
import { AddModelsComponent } from './models/add-models/add-models.component';
import { ImageUploadModule } from "angular2-image-upload";
import { TestModelsComponent } from './models/test-models/test-models.component';
import { StatementsComponent } from './statements/statements.component';
import { TypesComponent } from './statements/types/types.component';
import { ExpertComponent } from './statements/expert/expert.component';
import { BasicComponent } from './statements/basic/basic.component';
import { OpenDataComponent } from './open-data/open-data.component';
import { OpendataService } from './services/opendata.service';
import { DensityMapService } from './services/densitymap.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotificationsComponent } from './notifications/add-notifications/add-notifications.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


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
    MatExpansionModule,
    RouterModule,
    MatDatepickerModule,
    MatGridListModule,    
    HttpClientModule,
    ImageUploadModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    AboutService,
    FiwooService,
    OpendataService,
    DensityMapService
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
    AssetsComponent,    
    EditDevicesComponent, AddUsersComponent, AddAssetsComponent, AddRolesComponent, ModelsComponent, AddModelsComponent, TestModelsComponent, StatementsComponent, TypesComponent, ExpertComponent, BasicComponent, 
     OpenDataComponent, NotificationsComponent, AddNotificationsComponent
  ],
  entryComponents: [DialogOverviewExampleDialog],
})
export class PagesModule {
}
