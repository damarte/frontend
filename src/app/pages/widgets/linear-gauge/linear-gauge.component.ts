import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { style, trigger, animate, transition, state } from '@angular/animations';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { LinearGaugeService } from './service'; 
import { DevicesService } from 'iot_devices_fiwoo';
import { Router, NavigationStart } from '@angular/router';


declare var jQuery: any;

var interval;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./linear-gauge.css'],     
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(3000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(3000, style({opacity: 0}))

                ])
            ]),
        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])]
})
export class LinearGaugeComponent extends WidgetsBase implements OnDestroy {

    titleNew: any;
    minValue: number;
    maxValue: number;
        
    // chart options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'Tasks';
    xAxisLabel = 'Proxies';
    view: any[] = [700, 200];
    single: any [];
    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16', '#da871e', '#D449E1']
    };

    remoteService: any;
    detailMenuOpen: string;  
    selectedUri: string;

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                private _changeDetectionRef: ChangeDetectorRef,
                private _linearGaugeService: LinearGaugeService,
                private devicesService: DevicesService,
                router:Router) {
        super(_procMonRuntimeService,
            _widgetsInstanceService,
            _propertyService,            
            _changeDetectionRef);

        const single = [];

        Object.assign(this, {single});

        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
               
                clearInterval(interval);
            }
          });

        
    }

    public configDone(){
        if(this.devicesService != null){
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
                        }
                    });
    
                    this.titleNew = device_name;
                    this.loadDataGeneral(device_id, attribute);

                    this.minValue = this.getPropFromPropertyPages("min");
                    this.maxValue = this.getPropFromPropertyPages("max");
                }        
            }
        }
        this.run();
    }

    currentValue: number = 0;

    private loadDataGeneral (deviceId, attribute){
        var context = this;
        this.loadData(deviceId, attribute);
        interval = setInterval(function(){
            context.loadData(deviceId, attribute);
        }
        , context.refreshTime);         
    }

    loadData (deviceId, attribute){
        this.devicesService.readAttrDevice(deviceId, attribute).subscribe(res => {
            console.log(res);
            if (res.value != undefined){
                this.currentValue = res.value;
            }
        });
    }

    public preRun(): void {
        this.detailMenuOpen = 'out';
    }

    public run() {           
        
    }

    public checkPoxySelection() {
        this._linearGaugeService.getSelectedProxy().subscribe(result => {
            this.selectedUri = result._body;
        });
    }

    public seedProxiesWithWork() {

        this._linearGaugeService.seedProxiesWithWork().subscribe(data => {

            console.log('job running');
        });

    }

    public runProxyJob(uri: string) {

        this._linearGaugeService.runJob(uri).subscribe(data => {

            console.log('running job on proxy: ' + uri);
        });

    }

    public stop() {       
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
        this.minValue = updatedPropsObject.min;      
        this.maxValue = updatedPropsObject.max;         

        this.showOperationControls = true;

    }

    updateGraph() {       

    }

    public ngOnDestroy() {

        this.stop();

    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    customizeText(arg: any) {
        return arg.valueText + " kW";
    }

    customizeTooltip(arg) {
        var result = arg.valueText + " kW";
        if (arg.index >= 0) {
            result = "Secondary " + (arg.index + 1) + ": " + result;
        } else {
            result = "Primary: " + result;
        }
        return {
            text: result
        };
    }
}


