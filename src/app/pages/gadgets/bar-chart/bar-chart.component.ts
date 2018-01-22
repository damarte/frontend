import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {Observable} from 'rxjs/Observable';
import {ObservableWebSocketService} from '../../services/websocket-service';
import {ErrorObject} from '../../error/error-model';
import {ErrorHandler} from '../../error/error-handler';
import {Series} from '../_common/base-chart-models/series.model';
import {CountryInfo, Service} from './service';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css'],
    providers: [Service]
})

export class BarChartComponent extends GadgetBase implements OnDestroy, OnInit {

    // chart options
    countriesInfo: CountryInfo[];   

    gradient = true;
    legend = false;
    xAxis = true;
    yAxis = true;
    showGridLines = true;
    showXAxisLabel = true;
    showYAxisLabel = false;
    xAxisLabel = 'Available CPUs';
    yAxisLabel = 'Percent Utilization';
    view: any[];
    chartData: any[] = [];
    colorScheme: any = {
        domain: ['#0AFF16', '#0d5481']
    };
    webSocket: any;
    waitForConnectionDelay = 2000;

    constructor(protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,  private service: Service) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef,
        );

        this.countriesInfo = service.getCountriesInfo();
    }

    customizeTooltip(arg: any) {
        return {
            text: arg.percentText + ' - ' + arg.valueText
        };
    }

    public preRun(): void {
    }

    public run() {       
    }

    public stop() {        

    }

    public updateGraph() {      
    }


    public updateData(data: any[]) {

    }

    public updateProperties(updatedProperties: any) {

        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the gadget instance properties
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
        this.gradient = updatedPropsObject.gradient;
        this.legend = updatedPropsObject.legend;
        this.xAxis = updatedPropsObject.xAxis;
        this.yAxis = updatedPropsObject.yAxis;
        this.showGridLines = updatedPropsObject.showGridLines;
        this.showXAxisLabel = updatedPropsObject.showXAxisLabel;
        this.showYAxisLabel = updatedPropsObject.showYAxisLabel;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

    public ngOnDestroy() {

        this.stop();

    }

}
