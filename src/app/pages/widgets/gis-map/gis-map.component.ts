import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Observable } from 'rxjs/Observable';
import { ObservableWebSocketService } from '../../services/websocket-service';


import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html', 
    styleUrls: ['../_common/styles-widgets.css']
   
})
export class GisMapComponent extends WidgetsBase implements OnDestroy {

	  maps: any[];

	// options = {
 //        layers: [
 //          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
 //        ],
 //        zoom: 5,
 //        center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
 //      };

  	constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,
                public http: Http) {

                super(_runtimeService,
                    _widgetsInstanceService,
                    _propertyService,            
                    _changeDetectionRef
                );           
       
    }

	ngOnInit() {
	}
	

   	public preRun(): void {
    }

    public run() {  
    }

    public stop() {
    }

    public updateData(data: any[]) {
    }

    public updateProperties(updatedProperties: any) {   
    }

    public ngOnDestroy() {
        this.stop();
    }
    public ngAfterViewInit(){
           
        var instanceId = this.instanceId;
        var map = L.map('mapid'+instanceId, { attributionControl:false }).setView([43.462657, -3.809916], 13);
    
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
        
        L.tileLayer.wms("http://us2.fiwoo.eu:8080/geoserver/ows?", {
            layers: 's4c:devices',
            format: 'image/png',
            transparent: true,
           
        }).addTo(map);

    }

}
