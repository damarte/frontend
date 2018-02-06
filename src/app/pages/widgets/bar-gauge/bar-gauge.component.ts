import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Observable } from 'rxjs/Observable';
import { ObservableWebSocketService } from '../../services/websocket-service';
import { Product, Service, DeviceData } from './service';
import { DevicesService, Device } from 'iot_devices_fiwoo';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html', 
    styleUrls: ['../_common/styles-widgets.css'],
    providers: [Service]
})

export class BarGaugeComponent extends WidgetsBase implements OnDestroy {

    // chart options
    input: number;
    devices: any[];
    deviceData: DeviceData[];
    valuesDevices: DeviceData[];

    startValue = 0;
    endValue = 100;



    view: any[];
    colorScheme = {
        domain: ['#A13F51', '#5AA454', '#C7B42C']
    };

    currentValue = '0';
    previousValue = '0';
    webSocket: any;
    waitForConnectionDelay = 2000;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,
                private service: Service, public deviceService: DevicesService) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,            
            _changeDetectionRef);

            this.deviceService.listDevices().subscribe(res => {
                this.devices = res;
                this.deviceData = new Array<DeviceData>();
                this.loadDataGeneral();
            });

    }

    devicesToValues() {
        let values = [];

        this.deviceData.forEach(function (device) {
            if (device.active) {
                values.push(device.value);
            }
        })

        this.valuesDevices = values;
    }

    private loadDataGeneral (){
        this.devices.forEach(device => {
            this.deviceService.getHistorics(device.entity_name, "temperature").subscribe(res => {
                if (res instanceof Array){
                    var element = res[res.length - 1];
                    if (element != null){
                        var result = parseInt(element.attrValue, 10);
                        if (result < this.startValue){
                            this.startValue = result;
                        }
                        if (result > this.endValue){
                            this.endValue = result;
                        }
                        console.log(device.name, result);
                        this.deviceData.push(
                            {"name": device.name,
                            "value": result,
                            "active": true});
                    }
                }
                this.devicesToValues();
            });
            
        });   
    }


    customizeTooltip(arg) {
        return {
            text: arg.valueText + " ºC"
        };       
    }
    public preRun(): void {
    }

    public run() {     
    }

    public stop() {

    }

    public updateGraph(value: number) {

        if (Number(this.currentValue) > Number(this.previousValue)) {
            this.previousValue = this.currentValue;
        }

        this.currentValue = value + '';
        this.showOperationControls = true;

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

    public ngOnDestroy() {

        this.stop();

    }

}