import { ChangeDetectorRef, Component } from '@angular/core';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { DevicesService } from 'iot_devices_fiwoo';


export class DeviceAttribute {
    attribute: string;
    value: string;
    timestamp: string;
}

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './interactive-communication.component.html',
    styleUrls: ['./interactive-communication.component.scss']
})
export class InteractiveCommunicationComponent extends WidgetsBase {

    attributes: DeviceAttribute[] = [{
        attribute: "1",
        value: "144",
        timestamp: "12020202"
    }, {
        attribute: "2",
        value: "143",
        timestamp: "213123123123"
    }];


    textNew: string;

    constructor(protected _runtimeService: RuntimeService,
        protected _widgetsInstanceService: WidgetsInstanceService,
        protected _propertyService: WidgetsPropertyService,
        protected _changeDetectionRef: ChangeDetectorRef,
        public deviceService: DevicesService) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,
            _changeDetectionRef);


    }

    private loadData(deviceId) {
        this.deviceService.readDevice(deviceId).subscribe(res => {
            console.log(res);
        });
    }



    public configDone() {

        if (this.widget != undefined && this.widget.sources != undefined) {
            var source: any;

            if (this.widget.sources.length > 0) {

                source = this.widget.sources[0];

                var device_name, device_id, attribute, from, to;
                source.parameters.forEach(param => {
                    if (param.name === "device_name") {
                        device_name = param.value;
                    } else if (param.name === "device_id") {
                        device_id = param.value;
                    } else if (param.name === "attribute") {
                        attribute = param.value;
                    } else if (param.name === "from") {
                        from = param.value;
                    } else if (param.name === "to") {
                        to = param.value;
                    }
                });

                this.textNew = device_name;

                this.loadData(device_id);
            }
        }

    }

    public preRun(): void {

    }

    public run() {
    }

    public stop() {
    }

    public updateData() {

    }


    public updateProperties(updatedProperties: any) {

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

}
