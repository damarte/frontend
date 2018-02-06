import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { style, trigger, animate, transition, state } from '@angular/animations';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { PolarChartService, Production, Service  } from './service';


@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-widgets.css'],
    providers: [Service],
    animations: [

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
        ])
    ]
})
export class PolarChartComponent extends WidgetsBase implements OnDestroy {


    productionData: Production[];

    topic: any;
    data = {};

    showOperationControls = true;

    badColorScheme = {
        domain: ['#a10910', '#ffff00', '#DDDDDD']
    };
    goodColorScheme = {
        domain: ['#00c700', '#ffff00', '#DDDDDD']
    };
    vms: any;

    detailMenuOpen: string;
    

   

    donutServiceSubscription: any;

    colorScheme = this.goodColorScheme;

    constructor(protected service: Service, 
                protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _donutService: PolarChartService) {
        super(_runtimeService,
            _widgetsInstanceService,
            _propertyService,            
            _changeDetectionRef);
        
        this.productionData = service.getProductionData();

    }

    public preRun(): void {

        console.log('PRERUN');

        this.setTopic();        
    }

    public run() {

        this.initializeRunState(false);

        // process objects - take non successful objects and submit them to api for processing

        this.updateData(null);
    }

    public stop() {      

    }

   
    public updateData(data: any[]) {
    }


    /**
     * this is called when the property page is configured and saved
     * @param updatedProperties
     */
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

    setTopic() {
        this._donutService.getHelpTopic().subscribe(data => {
            this.topic = data;
        });
    }

    
     

    toggleAccordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    public ngOnDestroy() {

        this.stop();

    }
}
