import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { WidgetsModule } from '../widgets/widgets.module';
import { GridModule } from './grid/grid.module';
import { ConfigurationModule } from '../configuration/configuration.module';
import { AddWidgetsModule } from '../add-widgets/add-widgets.module';
import { WidgetsPropertyService } from '../widgets/_common/widgets-property.service';
import { ConfigurationService } from '../services/configuration.service';
import { RuntimeService } from '../services/runtime.service';
import { DashboardComponent } from './dashboard.component';
import { BarChartComponent } from '../widgets/bar-chart/bar-chart.component';
import { LinearGaugeComponent } from '../widgets/linear-gauge/linear-gauge.component';
import { LineChartComponent } from '../widgets/line-chart/line-chart.component';
import { CircularGaugeComponent } from '../widgets/circular-gauge/circular-gauge.component';
import { BarGaugeComponent } from '../widgets/bar-gauge/bar-gauge.component';
import { ObservableWebSocketService } from '../services/websocket-service';
import { DoughnutChartComponent } from '../widgets/doughnut-chart/doughnut-chart.component';
import { TypeAheadInputModule } from '../typeahead-input/typeahead-input.module';
import { PolarChartComponent } from '../widgets/polar-chart/polar-chart.component';
import { ToastModule } from '../toast/toast.module';


@NgModule({
    imports: [
        CommonModule,        
        AddWidgetsModule,
        ConfigurationModule,
        TypeAheadInputModule,
        ToastModule,
        GridModule.withComponents([
            BarGaugeComponent,            
            CircularGaugeComponent,
            LineChartComponent,
            LinearGaugeComponent,
            BarChartComponent,
            DoughnutChartComponent,
            PolarChartComponent

        ]),
        WidgetsModule,
        DndModule.forRoot(),
        MatButtonModule, MatIconModule,MatInputModule
    ],
    providers: [ RuntimeService,
        ConfigurationService,
        WidgetsPropertyService,
        ObservableWebSocketService
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}