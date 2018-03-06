import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Service, DeviceData } from './service';
import { DevicesService } from 'iot_devices_fiwoo';
import { Router } from '@angular/router';

var context;

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

    textNew: string = "";

    interval:any;

    showRefreshControls = true;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,
                protected _changeDetectionRef: ChangeDetectorRef,
                public deviceService: DevicesService,
                router:Router) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,
            _changeDetectionRef);

        context = this
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

    private loadDataGeneral() {
        context = this;
        this.loadData();
        this.loadIntervalData();

    }

    refresh(){
        this.loadIntervalData();
    }

    loadIntervalData() {
        clearInterval(this.interval);
        this.loadRepeatData(this);
        this.interval = setInterval(
            (function (self) {
                return function () {
                    self.loadRepeatData(self);
                }
            })(this),
            this.refreshTime
        );
    }

    loadData() {
        this.deviceData = [];
        this.devices.forEach(device => {
            this.deviceService.readAttrDevice(device.device_id, device.attribute).subscribe(res => {
                if (res.value != undefined) {
                    this.deviceData.push(
                        {
                            name: device.device_name,
                            value: res.value,
                            active: true
                        });
                }
                this.devicesToValues();
            });
        });
    }
    loadRepeatData(self) {
        self.devices.forEach(device => {
            self.deviceService.readAttrDevice(device.device_id, device.attribute).subscribe(res => {
                if (res.value != undefined) {
                    var data: any = self.getValueData(device.device_name);
                    if (data != null){
                        data.value = res.value;
                    }
                }
                self.devicesToValues();
            });
        });
    }

    getValueData(name) {
        var result: any = null;
        this.deviceData.forEach(deviceData => {
            if (deviceData.name == name) {
                result = deviceData;
            }
        });
        return result;
    }

    customizeTooltip(arg) {
        // var device = context.deviceData[arg.index];
        return {
            text: arg.valueText
        };
    }
    public preRun(): void {
    }

    public configDone() {
        if (this.widget != undefined && this.widget.sources != undefined) {
            this.devices = [];
            if (this.widget.sources.length > 0) {

                this.widget.sources.forEach(source => {
                    var device: any = {};
                    source.parameters.forEach(param => {
                        device[param.name] = param.value;
                    });
                    this.devices.push(device);
                });

                if (this.devices && this.devices.length) {
                    this.devices.forEach(function (currentValue, index, array) {
                        context.textNew = context.textNew.concat(currentValue.device_name.concat((index < (array.length - 1)) ? "-" : ""));
                    });
                }


                this.deviceData = new Array<DeviceData>();

                this.startValue = this.getPropFromPropertyPages("min");
                this.endValue = this.getPropFromPropertyPages("max");

                this.refreshTime = this.getPropFromPropertyPages("refresh");

                this.loadDataGeneral();
            }
        }
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

        var refreshTime = updatedPropsObject.refresh;
        if (refreshTime !== this.refreshTime) {
            this.refreshTime = refreshTime;
           this.loadIntervalData();
        }

        this.showOperationControls = true;

        this.startValue = updatedPropsObject.min;
        this.endValue = updatedPropsObject.max;
    }

    public ngOnDestroy() {
      this.stop();
    }
}
