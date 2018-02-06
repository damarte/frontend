import { Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { WidgetsInstanceService } from './grid.service';
import { WidgetsFactory } from '../../add-widgets/widgets-factory';

/*
 this class handles the dynamic creation of components
 */

@Component({
    selector: 'app-grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input() widgetType: string;
    @Input() widgetConfig: any;
    @Input() widgetInstanceId: number;


    constructor(private viewContainerRef: ViewContainerRef,
                private cfr: ComponentFactoryResolver, private gadgetInstanceService: WidgetsInstanceService) {
    }

    ngOnInit() {
        /*
         create component instance dynamically
         */
        const component: any = WidgetsFactory.getComponentType(this.widgetType);
        let compFactory: any = {};
        let gadgetRef: any = {};

        if (component) {
            compFactory = this.cfr.resolveComponentFactory(component);
            gadgetRef = this.viewContainerRef.createComponent(compFactory);

            /*
             we need to pass the input parameters (instance id and config) back into the newly created component.
             */
            gadgetRef.instance.configureGadget(this.widgetInstanceId, this.widgetConfig);

            /*
             add concrete component to service for tracking
             */
            this.gadgetInstanceService.addInstance(gadgetRef);
        }

    }

}

