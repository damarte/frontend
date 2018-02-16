import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Observable } from 'rxjs/Observable';
import { ObservableWebSocketService } from '../../services/websocket-service';
//import { Product, Service, DeviceData } from './service';
//import { WFSService } from 'gis_fiwoo';


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


  	constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,                
                private _changeDetectionRef: ChangeDetectorRef,
                private _webSocketService: ObservableWebSocketService,
                public http: Http) {

                super(_runtimeService,
                    _widgetsInstanceService,
                    _propertyService,            
                    _changeDetectionRef);
    }

	ngOnInit() {
	  	
	}


   	public preRun(): void {
    }

    public configDone(){
        
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
        
        this.maps = [{"type":"FeatureCollection","totalFeatures":4,"features":[{"type":"Feature","id":"devices.1","geometry":{"type":"Point","coordinates":[-3.783,43.4673]},"geometry_name":"geometry","properties":{"_id":"5a5f0e9c2c260400131897e8","name":"devices_general_3","protocol":"IoTA-UL","entity_type":"glucometer-type-1","transport_protocol":"HTTP","public":"true","assets":null,"owner":"507f191e810c19729de860ed","attributes":null,"lazy":null,"static_attributes":null,"commands":null,"internal_attributes":null,"createdAt":null,"updatedAt":null,"expiresAt":null,"latitude":null,"longitude":null,"bbox":[-3.783,43.4673,-3.783,43.4673]}},{"type":"Feature","id":"devices.2","geometry":{"type":"Point","coordinates":[-3.7828,43.4698]},"geometry_name":"geometry","properties":{"_id":"5a5f123c2c260422131897I9","name":"devices_test","protocol":"IoTA-UL","entity_type":"glucometer-type-2","transport_protocol":"HTTP","public":"true","assets":null,"owner":"507f191e810c19729de860ed","attributes":null,"lazy":null,"static_attributes":null,"commands":null,"internal_attributes":null,"createdAt":null,"updatedAt":null,"expiresAt":null,"latitude":null,"longitude":null,"bbox":[-3.7828,43.4698,-3.7828,43.4698]}},{"type":"Feature","id":"devices.3","geometry":{"type":"Point","coordinates":[-3.788,43.4702]},"geometry_name":"geometry","properties":{"_id":"5a5f6f9e2c260400131897fe","name":"void_devices","protocol":"IoTA-UL","entity_type":"glucometer-type-1","transport_protocol":"HTTP","public":"true","assets":null,"owner":"507f191e810c19729de860ed","attributes":null,"lazy":null,"static_attributes":null,"commands":null,"internal_attributes":null,"createdAt":null,"updatedAt":null,"expiresAt":null,"latitude":null,"longitude":null,"bbox":[-3.788,43.4702,-3.788,43.4702]}},{"type":"Feature","id":"devices.4","geometry":{"type":"Point","coordinates":[-3.7928,43.4694]},"geometry_name":"geometry","properties":{"_id":"5a606735e445980013c24904","name":"devices_test_1","protocol":"IoTA-UL","entity_type":"glucometer-type-1","transport_protocol":"HTTP","public":"true","assets":null,"owner":"507f191e810c19729de860ed","attributes":null,"lazy":null,"static_attributes":null,"commands":null,"internal_attributes":null,"createdAt":null,"updatedAt":null,"expiresAt":null,"latitude":null,"longitude":null,"bbox":[-3.7928,43.4694,-3.7928,43.4694]}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"bbox":[43.4673,-3.7928,43.4702,-3.7828]}]; 

        this.http.get(
          'http://us2.fiwoo.eu:8080/geoserver/ows?service=wfs&version=2.0.0&request=Getfeature&typeName=s4c:devices&outputFormat=JSON')
          .map(res => res.json()).subscribe(
            data => { this.maps = data; },
            err => {console.log(err); }
         );

       
        var instanceId = this.instanceId;
        var layer1 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');     
        var layer2 = L.tileLayer.wms("http://us2.fiwoo.eu:8080/geoserver/ows?", {
            layers: 's4c:devices',
            format: 'image/png',
            transparent: true,
        });


        var southWest = L.latLng(this.maps[0].bbox[0], this.maps[0].bbox[1]);
        var northEast = L.latLng(this.maps[0].bbox[2],this.maps[0].bbox[3]);
        var bounds = L.latLngBounds(southWest, northEast);
        var map = L.map('mapid'+instanceId,{
            layers:[layer1, layer2],
            maxBounds: bounds,
            center: [0,0],
            zoom:12,
            maxBoundsViscosity: 1,
            bounceAtZoomLimits: false,
            worldCopyJump: true,
            attributionControl: false
        });

    }

}
