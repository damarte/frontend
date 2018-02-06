import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddWidgetsComponent } from './add-widgets-component';
import { AddWidgetsService } from './service';
import { HttpClientModule } from '@angular/common/http';
import { DataListModule } from '../datalist/data-list.module';
import { MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DataListModule,
        HttpClientModule,
        MatButtonModule,
        MatSelectModule
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

