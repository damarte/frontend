import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CPUGadgetComponent} from './cpu/cpu-gadget.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {DiskGadgetComponent} from './disk/disk-gadget.component';
import {BarGaugeComponent} from './bar-gauge/bar-gauge.component';
import {LinearGaugeComponent} from './linear-gauge/linear-gauge.component';
import {StatisticGadgetComponent} from './statistic/statistic-gadget.component';
import {TrendGadgetComponent} from './trend/trend-gadget.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {NewsGadgetComponent} from './news/news-gadget.component';
import {CircularGaugeComponent} from './circular-gauge/circular-gauge.component';
import {CPUService} from './cpu/service';
import {LinearGaugeService} from './linear-gauge/service';
import {StatisticService} from './statistic/service';
import {DiskService} from './disk/service'; 
import {TrendService} from './trend/service';
import {PropertyListGadgetComponent} from './property-list/property-list-gadget.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form-module';
import {ServiceListGadgetComponent} from './service-list/service-list-gadget.component';
import {DndModule} from 'ng2-dnd';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {GadgetSharedModule} from './_common/gadget-shared.module';
import {ErrorHandlerModule} from '../error/error.module';

import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {
    MatButtonModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatInputModule,
    MatProgressBarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {StorageObjectListComponent} from './storage-object-list/storage-object-list.component'; 
import {StorageService} from './storage-object-list/service';
import {DataListModule} from '../datalist/data-list.module';
import {PolarChartComponent} from './polar-chart/polar-chart.component';
import {PolarChartService} from './polar-chart/service';
import {APITokenService} from '../api-token/api-token.service';
import {FacetModule} from '../facet/facet.module';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import { DxCircularGaugeModule, DxBarGaugeModule, DxLinearGaugeModule, DxSelectBoxModule, DxSliderModule,DxCheckBoxModule, DxPieChartModule, DxChartModule, DxChartComponent, DxPolarChartModule, DxMapModule, DxTextBoxModule, DxTemplateModule, DxRangeSelectorModule } from 'devextreme-angular';



@NgModule({
    imports: [
        CommonModule,
        GadgetSharedModule,
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
        DxRangeSelectorModule
    ],
    declarations: [
        CPUGadgetComponent,
        BarChartComponent,
        DiskGadgetComponent,
        BarGaugeComponent,
        LinearGaugeComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        LineChartComponent,
        NewsGadgetComponent,
        CircularGaugeComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        DoughnutChartComponent,
        StorageObjectListComponent,
        PolarChartComponent
    ],

    providers: [TrendService,
        DiskService,
        StatisticService,
        LinearGaugeService,
        CPUService,
        StorageService,
        PolarChartService,
        APITokenService
    ],

    exports: [
        CPUGadgetComponent,
        BarChartComponent,
        DiskGadgetComponent,
        BarGaugeComponent,
        LinearGaugeComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        LineChartComponent,
        NewsGadgetComponent,
        CircularGaugeComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent,
        DoughnutChartComponent,
        StorageObjectListComponent,
        PolarChartComponent
    ]
})
export class GadgetModule {
}

