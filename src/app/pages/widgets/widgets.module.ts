import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {BarGaugeComponent} from './bar-gauge/bar-gauge.component';
import {LinearGaugeComponent} from './linear-gauge/linear-gauge.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {CircularGaugeComponent} from './circular-gauge/circular-gauge.component';
import {LinearGaugeService} from './linear-gauge/service';
import {GisMapComponent} from './gis-map/gis-map.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form-module';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {WidgetsSharedModule} from './_common/widgets-shared.module';
import {ErrorHandlerModule} from '../error/error.module';

import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule,
    MatProgressBarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {DataListModule} from '../datalist/data-list.module';
import {PolarChartComponent} from './polar-chart/polar-chart.component';
import {PolarChartService} from './polar-chart/service';
import {APITokenService} from '../api-token/api-token.service';
import {FacetModule} from '../facet/facet.module';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import { DxCircularGaugeModule, DxBarGaugeModule, DxLinearGaugeModule, DxSelectBoxModule, DxSliderModule,DxCheckBoxModule, DxPieChartModule, 
    DxChartModule, DxChartComponent, DxPolarChartModule, DxMapModule, DxTextBoxModule, DxTemplateModule, DxRangeSelectorModule, DxDateBoxModule} from 'devextreme-angular';




@NgModule({
    imports: [
        CommonModule,
        WidgetsSharedModule,
        DndModule.forRoot(),
        DynamicFormModule,
        ErrorHandlerModule,
        NgxChartsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressBarModule,
        MatExpansionModule,
        FormsModule,
        FacetModule,
        TypeAheadInputModule,
        DataListModule,
        DxCircularGaugeModule,
        DxLinearGaugeModule, 
        DxBarGaugeModule,
        DxSelectBoxModule,
        DxSliderModule,
        DxPieChartModule,
        DxCheckBoxModule,
        DxChartModule,
        DxMapModule,
        DxPolarChartModule,
        DxTextBoxModule, 
        DxTemplateModule,
        DxRangeSelectorModule,
        DxDateBoxModule
    ],
    declarations: [
        BarChartComponent,        
        BarGaugeComponent,
        LinearGaugeComponent,       
        LineChartComponent,       
        CircularGaugeComponent,                
        DoughnutChartComponent,        
        PolarChartComponent, 
        GisMapComponent
    ],

    providers: [
        LinearGaugeService,        
        PolarChartService,
        APITokenService
    ],

    exports: [
        BarChartComponent,
        BarGaugeComponent,
        LinearGaugeComponent,
        LineChartComponent,
        CircularGaugeComponent,        
        DoughnutChartComponent,        
        PolarChartComponent,
        GisMapComponent
    ]
})
export class WidgetsModule {
}

