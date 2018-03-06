import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { LineChartService, Coordinate } from './service';
import { DevicesService } from 'iot_devices_fiwoo';
import { DxChartComponent } from 'devextreme-angular';

declare var require: any;
const moment = require('moment');

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

    textNew: string;

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

    private loadData(deviceId, attribute, from, to){
        this.chartDataSource = this.deviceService.getHistorics(deviceId, attribute, from, to).subscribe(res => {
            console.log(res);
            if (res instanceof Array){
                this.coordinates = new  Array<Coordinate>();
                var i = 0;
                res.forEach(element => {
                    this.coordinates.push({ arg: this.formatDate(element.createdAt), val: parseInt(element.value, 10)});
                    i++;
                });
            }

        });
    }

    private formatDate (date){
        return (moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }

    customizeTooltip(arg) {
        return {
            text: "Date: ".concat(arg.argumentText).concat("\n\n").concat("Value: ").concat(arg.valueText)
        };
    }

    onValueChanged(data) {

    }


    valueChanged(arg: any) {
        this.chart.instance.zoomArgument(arg.value[0], arg.value[1]);
    }


    public configDone() {

        if (this.widget != undefined && this.widget.sources != undefined){
            var source: any;

            if (this.widget.sources.length > 0){

                source = this.widget.sources[0];

                var device_name, device_id, attribute, from, to;
                source.parameters.forEach(param => {
                    if (param.name === "device_name"){
                        device_name = param.value;
                    }else if (param.name === "device_id"){
                        device_id = param.value;
                    }else if (param.name === "attribute"){
                        attribute = param.value;
                    }else if (param.name === "from"){
                        from = param.value;
                    }else if (param.name === "to"){
                        to = param.value;
                    }
                });

                this.currentDevice = device_id;

                this.textNew = device_name;

                this.loadData(device_id, attribute, from, to);
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
}
