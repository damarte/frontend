import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {Observable} from 'rxjs/Observable';
import {ObservableWebSocketService} from '../../services/websocket-service';
import { Product, Service, DeviceData } from './service';
import { DevicesService, Device } from 'iot_devices_fiwoo';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html', 
    styleUrls: ['../_common/styles-gadget.css'],
    providers: [Service]
})

export class BarGaugeComponent extends GadgetBase implements OnDestroy {

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
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,
                private service: Service, public deviceService: DevicesService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
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

        this.initializeRunState(false);

        this.webSocket = this._webSocketService.createObservableWebSocket(this.getEndPoint().address).subscribe(data => {

                const dataObject = JSON.parse(data);

                try {

                    let percent = dataObject.used / dataObject.total * 100;
                    percent = Math.round(percent);
                    this.updateGraph(percent);

                } catch (error) {
                    this.handleError(error);
                }

            },
            error => {

                console.log(error);

                this.handleError(error);
            });


        const timer = Observable.timer(this.waitForConnectionDelay);

        timer.subscribe(t => {

            // todo test whether we are connected of not
            this._webSocketService.sendMessage('start');
            this.setInRunState();

        });
    }

    public stop() {
        this.setStopState(true);

        try {

            this._webSocketService.sendMessage('stop');
            this.webSocket.unsubscribe();

        } catch (error) {

            this.handleError(error);
        }


        this.actionInitiated = false;
    }

    public updateData(data: any[]) {


    }

    public updateGraph(value: number) {

        if (Number(this.currentValue) > Number(this.previousValue)) {
            this.previousValue = this.currentValue;
        }

        this.currentValue = value + '';
        this.showOperationControls = true;

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

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;
    }

    public ngOnDestroy() {

        this.stop();

    }

}
