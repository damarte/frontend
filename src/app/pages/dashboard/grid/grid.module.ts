import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './grid.component';
import { CellComponent } from './cell.component';
import { WidgetsInstanceService } from './grid.service';
import { ConfigurationService } from '../../services/configuration.service';
import { AddWidgetsService } from '../../add-widgets/service';
import { DndModule } from 'ng2-dnd';
import { CircularGaugeService } from '../../widgets/circular-gauge/service';
import { LineChartService } from '../../widgets/line-chart/service';
import { LinearGaugeService } from '../../widgets/linear-gauge/service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PolarChartService } from '../../widgets/polar-chart/service'; 


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule, HttpModule, DndModule.forRoot()
    ],
    declarations: [
        GridComponent,
        CellComponent
    ],
    exports: [
        GridComponent
    ],
    providers: [
        WidgetsInstanceService,
        ConfigurationService,
        AddWidgetsService,        
        CircularGaugeService,
        LineChartService,
        LinearGaugeService,
        PolarChartService
    ]
})
export class GridModule {
    static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
