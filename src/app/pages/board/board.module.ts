import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {DndModule} from 'ng2-dnd';
import {GadgetModule} from '../gadgets/gadget.module';
import {GridModule} from './grid/grid.module';
import {ConfigurationModule} from '../configuration/configuration.module';
import {LayoutModule} from '../layout/layout.module';
import {AddGadgetModule} from '../add-gadget/add-gadget.module';
import {NotificationModule} from '../notification/notification.module';
import {GadgetPropertyService} from '../gadgets/_common/gadget-property.service';
import {ConfigurationService} from '../services/configuration.service';
import {RuntimeService} from '../services/runtime.service';
import {EndPointService} from '../configuration/tab-endpoint/endpoint.service';
import {BoardComponent} from './board.component';
import {BarChartComponent} from '../gadgets/bar-chart/bar-chart.component';
import {LinearGaugeComponent} from '../gadgets/linear-gauge/linear-gauge.component';
import {LineChartComponent} from '../gadgets/line-chart/line-chart.component';
import {CircularGaugeComponent} from '../gadgets/circular-gauge/circular-gauge.component';
import {NewsGadgetComponent} from '../gadgets/news/news-gadget.component';
import {TrendGadgetComponent} from '../gadgets/trend/trend-gadget.component';
import {StatisticGadgetComponent} from '../gadgets/statistic/statistic-gadget.component';
import {DiskGadgetComponent} from '../gadgets/disk/disk-gadget.component';
import {PropertyListGadgetComponent} from '../gadgets/property-list/property-list-gadget.component';
import {ServiceListGadgetComponent} from '../gadgets/service-list/service-list-gadget.component';
import {CPUGadgetComponent} from '../gadgets/cpu/cpu-gadget.component';
import {BarGaugeComponent} from '../gadgets/bar-gauge/bar-gauge.component';
import {ObservableWebSocketService} from '../services/websocket-service';
import {DoughnutChartComponent} from '../gadgets/doughnut-chart/doughnut-chart.component';
import {TypeAheadInputModule} from '../typeahead-input/typeahead-input.module';
import {StorageObjectListComponent} from '../gadgets/storage-object-list/storage-object-list.component';
import {PolarChartComponent} from '../gadgets/polar-chart/polar-chart.component';
import {ToastModule} from '../toast/toast.module';


@NgModule({
    imports: [
        CommonModule,
        NotificationModule,
        AddGadgetModule,
        LayoutModule,
        ConfigurationModule,
        TypeAheadInputModule,
        ToastModule,
        GridModule.withComponents([
            BarGaugeComponent,
            CPUGadgetComponent,
            ServiceListGadgetComponent,
            PropertyListGadgetComponent,
            DiskGadgetComponent,
            StatisticGadgetComponent,
            TrendGadgetComponent,
            NewsGadgetComponent,
            CircularGaugeComponent,
            LineChartComponent,
            LinearGaugeComponent,
            BarChartComponent,
            DoughnutChartComponent,
            StorageObjectListComponent,
            PolarChartComponent

        ]),
        GadgetModule,
        DndModule.forRoot(),
        MatButtonModule, MatIconModule,MatInputModule
    ],
    providers: [ EndPointService,
        RuntimeService,
        ConfigurationService,
        GadgetPropertyService,
        ObservableWebSocketService
    ],
    declarations: [
        BoardComponent
    ]
})
export class BoardModule {
}