import { ChangeDetectorRef, Component } from '@angular/core';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { CircularGaugeService } from './service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DevicesService } from 'iot_devices_fiwoo';
import { Router } from '@angular/router';

var interval;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./ja.css']
})

export class CircularGaugeComponent extends WidgetsBase {


    customizeText(arg: any) {
        return arg.valueText;
    }

    titleNew: any;
    minValue: number;
    maxValue: number;

    showOperationControls = true;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _circularGaugeService: CircularGaugeService,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
                private devicesService: DevicesService,
                router:Router) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,
            _changeDetectionRef);

        iconRegistry.addSvgIcon(
            'thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/ic_add_white_36px.svg'));

    }

    public configDone(){
        if(this.devicesService != null){
            if (this.widget != undefined && this.widget.sources != undefined){
                var source: any;
                if (this.widget.sources.length > 0){
                    source = this.widget.sources[0];
                }
                var device_id, attribute;
                source.parameters.forEach(param => {
                    if (param.name === "device_name"){
                        this.titleNew = param.value;
                    }else if (param.name === "device_id"){
                        device_id = param.value;
                    }else if (param.name === "attribute"){
                        attribute = param.value;
                    }
                });


                this.loadDataGeneral(device_id, attribute);

                this.minValue = this.getPropFromPropertyPages("min");
                this.maxValue = this.getPropFromPropertyPages("max");

            }
        }
        this.run();
    }

    public preRun(): void {
    }

    public run() {
        this.initializeRunState(true);

    }

    public stop() {
        this.setStopState(false);
    }

    public updateData(data: any[]) {


    }

    currentValue: number = 0;


    private loadDataGeneral (deviceId, attribute){
        this.loadData(deviceId, attribute);

        //Avoiding repeating widgets context problem.
        interval = setInterval(
            (function(self) {
                return function() {
                    self.loadData(deviceId, attribute);
                }
            })(this),
            this.refreshTime
        );

    }

    loadData (deviceId, attribute){
       this.devicesService.readAttrDevice(deviceId, attribute).subscribe(res => {
            if (res.value != undefined){
                this.currentValue = res.value;
            }
        });
    }

    public updateProperties(updatedProperties: any) {

        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the Widgets instance properties
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
        this.minValue = updatedPropsObject.min;
        this.maxValue = updatedPropsObject.max;

        this.showOperationControls = true;

    }

}
