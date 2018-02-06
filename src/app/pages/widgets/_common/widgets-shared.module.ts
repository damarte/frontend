import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsHeaderComponent } from './widgets-header-component';
import { WidgetsOperationComponent } from './widgets-operation-control-component';
import { HelpModalComponent } from './help-modal-component';
import { VisDrillDownComponent } from './vis-drill-down-component';
import { DndModule } from 'ng2-dnd';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DndModule.forRoot(),
        MatProgressBarModule,
    ],
    declarations: [

        WidgetsHeaderComponent,
        WidgetsOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent

    ],
    exports: [
        WidgetsHeaderComponent,
        WidgetsOperationComponent,
        HelpModalComponent,
        VisDrillDownComponent
    ]
})
export class WidgetsSharedModule {
}
