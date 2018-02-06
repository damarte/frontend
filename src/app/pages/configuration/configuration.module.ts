import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardConfigurationComponent } from './tab-configuration/board-configuration-component';
import { DndModule } from 'ng2-dnd';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        DndModule.forRoot(),
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BoardConfigurationComponent        
    ],
    providers: [],
    exports: [
        BoardConfigurationComponent        
    ]
})
export class ConfigurationModule {
}
