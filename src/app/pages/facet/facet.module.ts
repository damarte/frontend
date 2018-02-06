import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FacetComponent } from './facet-component';
import { FilterListComponent } from './filter-list-component';
import { FilterTagComponent } from './filter-tag-component';
import { CapitalizeFirstPipe } from './capitalize-first-character-pipe';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddWidgetsService } from '../add-widgets/service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule
    ],
    declarations: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        CapitalizeFirstPipe
    ],
    providers: [
        AddWidgetsService
    ],
    exports: [
        FacetComponent,
        FilterListComponent,
        FilterTagComponent,
        CapitalizeFirstPipe
    ]
})
export class FacetModule {
}
