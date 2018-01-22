import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { BoardModule } from './board/board.module';
import { DevicesComponent } from './devices/devices.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    BoardModule,
    Ng2SmartTableModule    
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DevicesComponent,
  ],
})
export class PagesModule {
}
