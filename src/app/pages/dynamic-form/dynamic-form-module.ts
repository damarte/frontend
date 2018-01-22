import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFormPropertyComponent} from './dynamic-form-property.component';
import {PropertyControlService} from './property-control.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormPropertyComponent
    ],
    providers: [PropertyControlService],
    exports: [
        DynamicFormComponent,
        DynamicFormPropertyComponent
    ]
})
export class DynamicFormModule {
}
