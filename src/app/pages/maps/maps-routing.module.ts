import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { LeafletComponent } from './leaflet/leaflet.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'leaflet',
    component: LeafletComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  LeafletComponent,
];
