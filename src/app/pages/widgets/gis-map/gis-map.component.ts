import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Observable } from 'rxjs/Observable';
import { ObservableWebSocketService } from '../../services/websocket-service';
import { LineChartService, Coordinate } from '../line-chart/service';
//import { Product, Service, DeviceData } from './service';
//import { WFSService } from 'gis_fiwoo';


import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

import { MouseEvent as AGMMouseEvent } from '@agm/core';
@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html', 
    styleUrls: ['../_common/styles-widgets.css', './gis-map.component.css'] 
   
})
export class GisMapComponent extends WidgetsBase implements OnDestroy {

	maps: any[];
    map:any;
    prop: any;
    test: any;
    attrs:any[];
    features:any[];
    lng:any[];
    deviceId: any;
    attrHistoric:any;
    coordinates: Coordinate[]; 
    showLineChart: boolean; 

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

        // http://stg-sac-fase-dos-instance-02.emergyalabs.com:10000/
        // https://platform.fiwoo.eu/api/

        this.http.get(
          'http://stg-sac-fase-dos-instance-02.emergyalabs.com:10000/gis/ows?service=wfs&version=2.0.0&request=Getfeature&typeName=s4c:devices&outputFormat=JSON')
          .map(res => res.json()).subscribe(
            data => {
                this.maps = data; 

                var southWest = L.latLng(this.maps['bbox'][0], this.maps['bbox'][1]);
                var northEast = L.latLng(this.maps['bbox'][2],this.maps['bbox'][3]);
                var bounds = L.latLngBounds(southWest, northEast);
                var map = L.map('mapid'+instanceId,{
                    layers:[layer1],
                    maxBounds: bounds,
                    center: [0,0],
                    zoom:18,
                    maxBoundsViscosity: 1,
                    bounceAtZoomLimits: false,
                    worldCopyJump: true,
                    attributionControl: false
                });

                this.map = map;
                this.features = this.maps['features'];

                var icon = L.icon({
                    iconUrl: 'assets/images/iconmap.png',
                    iconSize:     [20, 38], // size of the icon                   
                    shadowAnchor: [4, 62],  // the same for the shadow

                });
               

                var features = this.maps['features'];
                var id;
                var marker;

                for (var feature in features) {
                  if(features[feature].geometry){      
                        id = JSON.parse(features[feature]['id']);
                        id = id['id'];  

                        marker = L.marker([features[feature].geometry.coordinates[1], features[feature].geometry.coordinates[0]],
                           {    
                              'icon': icon,
                              'title': id,

                           }
                        ).on('click',
                              (e) => {
                                var features = this.features;
                                this.showLineChart = false;
                                this.attrHistoric = '';
                                document.getElementById('device').innerHTML = "";
                                document.getElementById('properties').innerHTML = "";
                                var attrNames = null;
                                var id;
                                features.forEach( function(valor, indice, array) {
                                    if(valor.geometry){               
                                       if(valor.geometry.coordinates[0].toFixed(3) == parseFloat(e['latlng']['lng']).toFixed(3)  && valor.geometry.coordinates[1].toFixed(3) == parseFloat(e['latlng']['lat']).toFixed(3) ){
                                            id = JSON.parse(valor['id']);
                                            id = id['id'];
                                            document.getElementById('device').innerHTML =  "Device: "  + id;      
                                            //document.getElementById('properties').innerHTML =  "Properties: ";    
                                            var properties = valor.properties;
                                            attrNames = JSON.parse(properties['attrNames']);                      
                                        }
                                    }
                                });

                                this.attrs = attrNames;
                                this.deviceId  = id;
                        });

                        // var popupLocation1 = new L.LatLng(-50,-80);
                        // var popupContent1 = 'This is a nice popup';

                        // var popup1 = new L.Popup();
                        // popup1.setLatLng(popupLocation1);
                        // popup1.setContent(popupContent1);

                        // marker.bindPopup(popup1);

                        // marker.openPopup();
                        marker.addTo(map);
                    }
                }

               

                map.fitBounds(bounds); // [2]

                map.on('mousemove ', function(e){
                    document.getElementById('location').innerHTML =  parseFloat(e['latlng']['lat']).toFixed(3) + " / " + parseFloat(e['latlng']['lng']).toFixed(3);      
                });
               
         },
            err => {console.log(err); }
        );

        var instanceId = this.instanceId;
        var layer1 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');     
        var layer2 = L.tileLayer.wms("http://stg-sac-fase-dos-instance-02.emergyalabs.com:10000/gis/ows?", {
            layers: 's4c:devices',
            version: '2.0.0',
            format: 'image/png',
            transparent: true,
        });

    }
    
    history(event){
        this.attrHistoric = event;
        this.http.get(
            'https://platform.fiwoo.eu/api/device-management/devices/historics/?id='+this.deviceId+'&attribute='+event+'')
             .map(res => res.json()).subscribe(
                data => {
                    if (data instanceof Array){
                        this.coordinates = new  Array<Coordinate>();
                        var i = 0;
                        data.forEach(element => {
                            this.coordinates.push({ arg: element.recvTime, val: parseInt(element.attrValue, 10)});
                            i++;
                        });
                    }
                    this.showLineChart = true;
            },
                err => {console.log(err); this.showLineChart = false;}
            );
    }

}
