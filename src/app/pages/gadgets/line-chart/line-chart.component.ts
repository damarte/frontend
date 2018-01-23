import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {GadgetInstanceService} from '../../board/grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {GadgetPropertyService} from '../_common/gadget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {GadgetBase} from '../_common/gadget-base';
import {LineChartService, Coordinate} from './service';
import {Observable} from 'rxjs/Observable';
import { DevicesService, Device } from 'iot_devices_fiwoo';
import { DxChartModule, DxChartComponent, DxRangeSelectorModule } from 'devextreme-angular';
import { forEach } from '@angular/router/src/utils/collection';


declare var d3: any;

@Component({
    selector: 'app-dynamic-component', 
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-gadget.css']
})

export class LineChartComponent extends GadgetBase {
    
    @ViewChild(DxChartComponent) chart: DxChartComponent;
    
    
    chartDataSource: any;
    sensorsDataSource: any;
    currentDevice: any;
    coordinates: Coordinate[];     
    
    autoScale = true;
    collectors: Array<string> = [];
    eventTimerSubscription: any;

    constructor(protected _trendLineService: LineChartService,
                protected _runtimeService: RuntimeService,
                protected _gadgetInstanceService: GadgetInstanceService,
                protected _propertyService: GadgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                public deviceService: DevicesService) {
        super(_runtimeService,
            _gadgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);                   

             

            this.deviceService.listDevices().subscribe(res => {
                this.sensorsDataSource = res;
                if (res.length > 0){
                    var thisDevice:any = res[0];
                    this.currentDevice = thisDevice._id;
                    this.loadData(thisDevice.entity_name, 'temperature', '17-01-2018T02:18:13', '17-01-2018T10:10:13');                    
                }
                
            });

    }

    private getEntityNameByDeviceId(deviceId) {
        var result = null;
        if (this.sensorsDataSource != null){
            this.sensorsDataSource.forEach(element => {
                if (element._id === deviceId){
                    result = element.entity_name;
                }
            });
        }
        return result;
    }

    private loadData(deviceId, attribute, from, to){
        this.chartDataSource = this.deviceService.getHistorics(deviceId, attribute, from, to).subscribe(res => {
            console.log(res);
            if (res instanceof Array){
                this.coordinates = new  Array<Coordinate>();
                var i = 0;
                res.forEach(element => {
                    this.coordinates.push({ arg: element.recvTime, val: parseInt(element.attrValue, 10)});
                    i++;
                });
            }
            
        });
    }

    customizeTooltip(arg) {
        return {
            text: arg.valueText + '&#176C'
        };
    }
    customizeText(arg) {
        return arg.valueText + '&#176C';
    }
    onValueChanged(data) {
        console.log(data);        
    }

    onDeviceChanged(data) {
        console.log(data);
        var entityName = this.getEntityNameByDeviceId(data.value);
        this.loadData(entityName, 'temperature', '17-01-2018T02:18:13', '17-01-2018T10:10:13');        
    }

    valueChanged(arg: any) {
        this.chart.instance.zoomArgument(arg.value[0], arg.value[1]);
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
        this.showOperationControls = true;       
    }
    
}
