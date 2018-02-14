import { ViewChild, ElementRef, AfterViewInit, Component, Output, EventEmitter } from '@angular/core';
import { style, trigger, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import { AddWidgetsService } from './service';
import { Facet } from '../facet/facet-model';
import { FacetTagProcessor } from '../facet/facet-tag-processor';
import { DevicesService } from "iot_devices_fiwoo";
import { FormControl } from '@angular/forms';
import { componentFactoryName } from '@angular/compiler';

declare var jQuery: any;

enum WIDGET_TYPES {
    TYPE_SINGLE,
    TYPE_SINGLE_HISTORIC,
    TYPE_MULTIPLE,
    TYPE_MULTIPLE_HISTORIC
}

/**
 * Message Modal - clasable modal with message
 *
 * Selector message-modal
 *
 * Methods
 *      popMessageModal - display a message modal for a sepcified duration
 *      showMessageModal - show the message modal
 *      hideMessageModal - hide the message modal
 */
@Component({
    selector: 'app-add-gadget-modal',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(750, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(750, style({opacity: 0}))
                ])
            ])
    ]

})
export class AddWidgetsComponent implements AfterViewInit {

    @Output() addGadgetEvent: EventEmitter<any> = new EventEmitter();

    gadgetObjectList: any[] = [];
    gadgetObjectTitleList: string[] = [];
    placeHolderText = 'Begin typing widget name';
    layoutColumnOneWidth = 'six';
    layoutColumnTwoWidth = 'ten';
    listHeader= 'Widgets';
    facetTags: Array<Facet>;

    color = 'white';

    modalicon: string;
    modalheader: string;
    modalmessage: string;

    @ViewChild('messagemodal_tag') messagemodalRef: ElementRef;

    messageModal: any;

   
    sensors : any[];
    attributes: any[];

    selectedDevice: any;
    selectedAttribute: any;

    fromDate:Date;
    toDate = new Date();
    minDate = new Date(2017, 0, 1);
    maxDate = new Date();

    insertDates: boolean = true;

    widgetSelected: any;

    styleNoSelected = "rgb(255, 255, 255)";
    styleSelected = "rgb(214, 213, 213)";

    showDateControls = false;

    sensorsFormControl = new FormControl();

    isMultiple = true;

    constructor(private _addWidgetsService: AddWidgetsService,
                private _devicesServices: DevicesService) {

        this.getObjectList();

        this.fromDate = new Date();
        this.fromDate.setDate(this.fromDate.getDate()-7);

        this._devicesServices.listDevices().subscribe(res => {
            this.sensors = res;
            this.resetSensors();
        });
    }
    
    checkComponents(){
        var componentType = this.widgetSelected.componentType;
        switch(componentType){
            case "BarChartComponent":
            return WIDGET_TYPES.TYPE_MULTIPLE;
            case "DoughnutChartComponent":
            return WIDGET_TYPES.TYPE_MULTIPLE;
            case "LinearGaugeComponent":
            return WIDGET_TYPES.TYPE_SINGLE;
            case "LineChartComponent":
            return WIDGET_TYPES.TYPE_SINGLE_HISTORIC;
            case "BarGaugeComponent":
            return WIDGET_TYPES.TYPE_MULTIPLE;
            case "PolarChartComponent":
            return WIDGET_TYPES.TYPE_MULTIPLE;
            case "CircularGaugeComponent":
            return WIDGET_TYPES.TYPE_SINGLE;
        }
    }

    getTitle (){
        switch (this.checkComponents()){
            case WIDGET_TYPES.TYPE_SINGLE:
                this.showDateControls = false;
                this.isMultiple = false;
                return "Select one device and one attribute";
            case WIDGET_TYPES.TYPE_SINGLE_HISTORIC:
                this.showDateControls = true;
                this.isMultiple = false;
                return "Select a device, an attribute and the data range"
            case WIDGET_TYPES.TYPE_MULTIPLE:
                this.showDateControls = false;
                this.isMultiple = true;
                return "Select multiple devices and one attribute"
            case WIDGET_TYPES.TYPE_SINGLE:
                this.showDateControls = false;
                this.isMultiple = true;
                return "Select multiple devices, an attribute and the data range"
        }
    }

    restart(): void{
        this.widgetSelected = undefined;
        this.selectedDevice = undefined;
        this.selectedAttribute = undefined;

        this.resetSelectedvalues();
    }

    onDeviceChanged(value):void {
        this.selectedAttribute = undefined;
        var valueToCheck: any;
        if (value instanceof Array){
            if (value.length > 0){
                valueToCheck = value[0];
                this.checkSensors(valueToCheck.entity_type);
            }else{
                //Nothing selected
                this.resetSensors();
                return;
            }
        }else{
            valueToCheck = value;
        }
        
        this.attributes = [];
        this._devicesServices.readDevice(valueToCheck.entity_name).subscribe(res => {  
            if (res != undefined && res != null && !res.error){
                this.attributes = Object.keys(res);
            }else{
                this.attributes = [];
            }
        });
        
    }

    checkSensors(entity_type){
        if (this.sensors != undefined && this.sensors.length > 0){
            this.sensors.forEach(element => {
                element.canBeSelected = element.entity_type == entity_type;
            });
        }
    }

    resetSensors(){
        if (this.sensors != undefined && this.sensors.length > 0){
            this.sensors.forEach(element => {
                element.canBeSelected = true;
            });
        }
    }

    resetSelectedvalues(){
        if (this.gadgetObjectList !=  undefined && this.gadgetObjectList.length > 0){
            this.gadgetObjectList.forEach(element => {
                element.selected = false;
            });
        }
       
    }

    onAttributeChanged(value):void {
        console.log(value);
        
    }

    updateWidgetInfo (widget: any){
        var devices = [];
        if (this.selectedDevice instanceof Array){
            devices = this.selectedDevice
        }else{
            devices.push(this.selectedDevice);
        }
        widget.extra_data = [];
        widget.sources = [];
        widget.type = null;
        // widget.properties = [
        //     {
        //         "id": 37,
        //         "name": "width",
        //         "value": "220px"
        //     },
        //     {
        //         "id": 38,
        //         "name": "height",
        //         "value": "220px"
        //     },
        //     {
        //         "id": 39,
        //         "name": "position",
        //         "value": "top"
        //     }
        // ];
        // "url": "http://platform.fiwoo.eu/api/devices/historics?id=A81B6AA907B5&attributes=temperature&from=16-12-2017T00:00:00&to=17-01-2018T00:00:00",

        devices.forEach(element => {
            var extra: any = {
                "device_id": element.entity_name,
                "attribute": this.selectedAttribute,
                "device_name": element.name
            };
            var url = `https://platform.fiwoo.eu/api/device-management/devices/historics?${element.entity_name}&attribute=${this.selectedAttribute}`;
            if (this.showDateControls){
                url = url.concat(`&from=${this.changeDate(this.fromDate)}&to=${this.changeDate(this.toDate)}`);
                extra.from = this.changeDate(this.fromDate);
                extra.to = this.changeDate(this.toDate);
            }
            widget.extra_data.push(extra);
            widget.sources.push({
                "url": url,
                // "parameters": [
                //     {
                //         "id": 25,
                //         "name": "parameter_a",
                //         "value": "value_a",
                //         "operator": "operator_a"
                //     },
                //     {
                //         "id": 26,
                //         "name": "parameter_b",
                //         "value": "value_b",
                //         "operator": "operator_b"
                //     }
                // ]
            });
        });

      
        // var url = `https://platform.fiwoo.eu/api/device-management/devices/historics?${this.selectedDevice.entity_name}&attribute=${this.selectedAttribute}`;
        // widget.extra_data = [];
        // if (this.insertDates){
        //     url = url.concat(`&from=${this.changeDate(this.fromDate)}&to=${this.changeDate(this.toDate)}`);
        //     widget.extra_data.from = this.changeDate(this.fromDate);
        //     widget.extra_data.to = this.changeDate(this.toDate);
        // }
        // widget.sources = [
        //     {
        //         "url": url,
                // "parameters": [
                //     {
                //         "id": 25,
                //         "name": "parameter_a",
                //         "value": "value_a",
                //         "operator": "operator_a"
                //     },
                //     {
                //         "id": 26,
                //         "name": "parameter_b",
                //         "value": "value_b",
                //         "operator": "operator_b"
                //     }
                // ]
        //     }
        // ];
        return widget;

    }


    actionHandler(actionItem, actionName) {
        this.resetSelectedvalues();
        actionItem.selected = true;
        this.widgetSelected = actionItem;     

    }

    saveWidget(actionItem){
        //TODO Validations
        if ((this.selectedDevice != undefined && this.selectedDevice != null) &&
           (this.selectedAttribute != undefined && this.selectedAttribute != null)) {
            actionItem = this.updateWidgetInfo(actionItem);
            this.addGadgetEvent.emit(actionItem);
            this.hideMessageModal();           
        } 
    }


    popMessageModal(icon: string, header: string, message: string, durationms: number) {
        this.showMessageModal(icon, header, message);
        Observable.interval(durationms).take(1).subscribe(
            () => {
                this.hideMessageModal();
            }
        );
    }

    showMessageModal(icon: string, header: string, message: string) {        
        this.modalicon = icon;
        this.modalheader = header;
        this.modalmessage = message;
        this.messageModal.modal('show');

    }

    showComponentLibraryModal(header: string) {

        this.modalheader = header;
        this.messageModal.modal('show');
    }

    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalmessage = '';
        this.messageModal.modal('hide');
    }

    ngAfterViewInit() {
        this.messageModal = jQuery(this.messagemodalRef.nativeElement);
    }

    getObjectList() {

        this._addWidgetsService.getGadgetLibrary().subscribe(data => {
            this.gadgetObjectList.length = 0;
            const me = this;
            data.library.forEach(function (item) {
                me.gadgetObjectList.push(item);
                me.gadgetObjectTitleList.push(item.name);
            });
            const facetTagProcess = new FacetTagProcessor(this.gadgetObjectList);
            this.facetTags = facetTagProcess.getFacetTags();
        });

    }

    addWidget(){
        this.saveWidget(this.widgetSelected);
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
