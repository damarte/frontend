import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { LineChartService, Coordinate } from './service';
import { Observable } from 'rxjs/Observable';
import { DevicesService, Device } from 'iot_devices_fiwoo';
import { DxChartModule, DxChartComponent, DxRangeSelectorModule } from 'devextreme-angular';
import { forEach } from '@angular/router/src/utils/collection';
import { DatePipe } from '@angular/common';


declare var d3: any;

@Component({
    selector: 'app-dynamic-component', 
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent extends WidgetsBase {
    
    @ViewChild(DxChartComponent) chart: DxChartComponent;
    
    
    chartDataSource: any;
    sensorsDataSource: any;
    currentDevice: any;
    coordinates: Coordinate[];     

    fromDate:Date;
    toDate = new Date();
    minDate = new Date(2017, 0, 1);
    maxDate = new Date();
    
    autoScale = true;
    collectors: Array<string> = [];
    eventTimerSubscription: any;

    constructor(protected _trendLineService: LineChartService,
                protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                protected _changeDetectionRef: ChangeDetectorRef,
                public deviceService: DevicesService) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,            
            _changeDetectionRef);

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
        this.currentDevice = data.value;
        var entityName = this.getEntityNameByDeviceId(this.currentDevice);
        this.loadData(entityName, 'temperature', this.changeDate(this.fromDate), this.changeDate(this.toDate));
    }

    onDateFromChanged(data) {
        console.log(data);
        this.fromDate = data.value;
        var entityName = this.getEntityNameByDeviceId(this.currentDevice);
        this.loadData(entityName, 'temperature', this.changeDate(this.fromDate), this.changeDate(this.toDate));
    }

    onDateToChanged(data) {
        console.log(data);
        this.toDate = data.value;
        var entityName = this.getEntityNameByDeviceId(this.currentDevice);
        this.loadData(entityName, 'temperature', this.changeDate(this.fromDate), this.changeDate(this.toDate));
    }


    valueChanged(arg: any) {
        this.chart.instance.zoomArgument(arg.value[0], arg.value[1]);
    }

    public configDone() {

        console.log(this.widget);

        this.fromDate = new Date();
        this.fromDate.setDate(this.fromDate.getDate()-7);

        if (this.widget != undefined && this.widget.extra_data != undefined){

            var extra_data: any;
            if (this.widget.extra_data.length > 0){
                extra_data = this.widget.extra_data[0];
            }
        
            this.currentDevice = extra_data.device_id;
            
            
            this.loadData(extra_data.device_id, extra_data.attribute, extra_data.from, extra_data.to);
        }

        // this.deviceService.listDevices().subscribe(res => {
        //     this.sensorsDataSource = res;
        //     if (res.length > 0){
        //         var thisDevice:any = res[0];
        //         this.currentDevice = thisDevice._id;
        //         this.loadData(thisDevice.entity_name, 'temperature', this.changeDate(this.fromDate), this.changeDate(this.toDate));                    
        //     }
            
        // });  
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

    private changeDate (date: Date){
        var days:string;
        var months:string;
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        
        days = dd + '';
        months = mm + '';

        if(dd<10){
            days ='0'+ dd;
        }

        if(mm<10){
            months = '0'+ mm;
        }
        return days + '-' + months + '-' + yyyy + 'T00:00:00';
    }
    
}
