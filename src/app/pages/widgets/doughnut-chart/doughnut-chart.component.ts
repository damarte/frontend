import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsBase } from '../_common/widgets-base';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { LanguageData, Service } from './service';


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-widgets.css'],
    providers: [Service],
})
export class DoughnutChartComponent extends WidgetsBase implements OnDestroy {

    internetLanguages: LanguageData[];

    single: any = [];
    view: any[];
    colorScheme: any = {
        domain: ['#0AFF16', '#0d5481']
    };
    testURL = '';

    constructor(protected service: Service, protected _procMonRuntimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,
                protected _changeDetectionRef: ChangeDetectorRef) {
        super(_procMonRuntimeService, _widgetsInstanceService, _propertyService, _changeDetectionRef);
        this.internetLanguages = service.getLanguagesData();
    }

    customizeLabel(point) {
        return point.argumentText + ": " + point.valueText + "%";
    }

    public configDone(){

    }

    public preRun(): void {

    }

    public run() {
    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(data: any[]) {
    }

    public updateProperties(updatedProperties: any) {

        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the widgets instance properties
         *  which is what the code below does. This can be eliminated with code added to the
         *  config service or the property page service.
         *
         * **/

        const updatedPropsObject = JSON.parse(updatedProperties);

        this.propertyPages.forEach(function (propertyPage) {


            for (let x = 0; x < propertyPage.properties.length; x++) {

                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }

                    }
                }
            }
        });


        this.title = updatedPropsObject.title;
        this.showOperationControls = true;
    }

    ngOnDestroy() {

    }
}
