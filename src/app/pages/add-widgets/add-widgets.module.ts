import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddWidgetsComponent } from './add-widgets-component';
import { AddWidgetsService } from './service';
import { HttpClientModule } from '@angular/common/http';
import { DataListModule } from '../datalist/data-list.module';
import { MatButtonModule, MatSelectModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatChipsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DataListModule,
        HttpClientModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCheckboxModule,
        MatChipsModule
        
    ],
    declarations: [
        AddWidgetsComponent
    ],
    providers: [
        AddWidgetsService
    ],
    exports: [
        AddWidgetsComponent
    ]
})
export class AddWidgetsModule {
}

