import { ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { RuntimeService } from '../../services/runtime.service';
import { WidgetsInstanceService } from '../../dashboard/grid/grid.service';
import { WidgetsPropertyService } from '../_common/widgets-property.service';
import { WidgetsBase } from '../_common/widgets-base';
import { Coordinate } from '../line-chart/service';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import * as L from 'leaflet';
import '../../../../../node_modules/leaflet-toolbar/dist/leaflet.toolbar.js';
import { DensityMapService } from '../../services/densitymap.service';
import { GisService } from '../../services/gis.service';

declare var require: any;
const moment = require('moment');

var context;

@Component({
    selector: 'app-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-widgets.css', './gis-map.component.scss']

})
export class GisMapComponent extends WidgetsBase implements OnDestroy, OnInit, AfterViewInit {

    maps: any[];
    map: any;
    prop: any;
    test: any;
    attrs: any[];
    features: any[];
    lng: any[];
    deviceId: any;
    attrHistoric:any;
    coordinates: Coordinate[];
    showLineChart: boolean;

    toolbar:any;
    area: any;

    textNew:string = "";

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetsInstanceService: WidgetsInstanceService,
                protected _propertyService: WidgetsPropertyService,
                protected _changeDetectionRef: ChangeDetectorRef,
                private densityService: DensityMapService,
                private gisService: GisService,
                public http: Http) {

                super(_runtimeService,
                    _widgetsInstanceService,
                    _propertyService,
                    _changeDetectionRef);

                    context = this;

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

    private initMap(){
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osm = L.tileLayer(osmUrl);

        this.map = L.map('mapid'+ this.instanceId,{
          layers:[osm],
          maxBounds: null,
          center: [0,0],
          zoom:18,
          maxBoundsViscosity: 1,
          bounceAtZoomLimits: false,
          worldCopyJump: true,
          attributionControl: false
        });

        this.addToolbar();
      }

    public ngAfterViewInit(){
        this.getGISValue();
    }

    history(event){
        this.attrHistoric = event;
        this.http.get(
            'https://platform.fiwoo.eu/api/device-management/devices/historics/?id='+ this.deviceId +'&attribute=' + event +'')
             .map(res => res.json()).subscribe(
                data => {
                    if (data instanceof Array){
                        this.coordinates = new  Array<Coordinate>();
                        var i = 0;

                        data = data.slice(Math.max(data.length - 50, 1))

                        data.forEach(element => {
                            this.coordinates.push({ arg: this.formatDate(element.createdAt), val: parseInt(element.value, 10)});
                            i++;
                        });
                    }
                    this.showLineChart = true;
            },
                err => {console.log(err); this.showLineChart = false;}
            );
    }

    private formatDate (date){
        return (moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }

    customizeTooltip(arg) {
        return {
            text: "Date: ".concat(arg.argumentText).concat("\n\n").concat("Value: ").concat(arg.valueText)
        };
    }

    private getGISValue(){
       this.gisService.getGISData().subscribe(
           data => {
            this.initMap();

            this.maps = data;

            var southWest = L.latLng(this.maps['bbox'][0], this.maps['bbox'][1]);
            var northEast = L.latLng(this.maps['bbox'][2],this.maps['bbox'][3]);
            var bounds = L.latLngBounds(southWest, northEast);

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
                            this.showLineChart = false;
                            this.attrHistoric = '';
                            document.getElementById('device').innerHTML = "";
                            document.getElementById('properties').innerHTML = "";
                            var attrNames = null;
                            var auxId;
                            this.features.forEach( function(valor, indice, array) {
                                if(valor.geometry){
                                    if(valor.geometry.coordinates[0].toFixed(3) == parseFloat(e['latlng']['lng']).toFixed(3)  && valor.geometry.coordinates[1].toFixed(3) == parseFloat(e['latlng']['lat']).toFixed(3) ){
                                        auxId = JSON.parse(valor['id']);
                                        auxId = auxId['id'];
                                        document.getElementById('device').innerHTML =  "Device: "  + auxId;
                                        var properties = valor.properties;
                                        attrNames = JSON.parse(properties['attrNames']);
                                    }
                                }
                            });

                            this.attrs = attrNames;
                            this.deviceId  = auxId;
                    });
                    marker.addTo(this.map);
                }
            }

            this.map.fitBounds(bounds); // [2]

            this.map.on('mousemove ', function(e){
                document.getElementById('location').innerHTML =  parseFloat(e['latlng']['lat']).toFixed(3) + " / " + parseFloat(e['latlng']['lng']).toFixed(3);
            });
       });
    }

    private getDensity(){
        var points = [];
        var heatPercentage: any;
        this.densityService.getDensityMap().subscribe(data => {
        console.log(data);
        if (data.length && data.length == 2){
            var coordinates = data[0].coordinates;
            heatPercentage = data[1].HeatPercentage;
            if (coordinates){
                coordinates.forEach(coordinate => {
                    var coords = coordinate.split(',');
                    points.push(coords);
                });
            }
        }

        var bounds = L.latLngBounds(points);
        this.map.fitBounds(bounds, {padding: L.point(20, 20)});


        this.area = L.polygon(points, {
            weight: 5,
            color: this.getHeatColour(heatPercentage),
            opacity: 1.0
        }).addTo(this.map);


        this.area.bindPopup("Contamination<br><b>" + heatPercentage + " %</b>");

        });
      }


      private getHeatColour (percentage){
        //TODO Set Colours and Limits
        if (percentage >= 0 && percentage <= 20){
          return 'blue'
        }else if (percentage > 20 && percentage <= 40){
          return 'green'
        }else if (percentage > 40 && percentage <= 60){
          return 'yellow'
        }else if (percentage > 60 && percentage <= 80){
          return 'orange'
        }else if (percentage > 80 && percentage <= 100){
          return 'red'
        }

      }

      toogleAreaVisibility(){
        if (this.area){
          this.map.removeLayer(this.area);
          this.area = null;
        }else{
          this.getDensity();
        }
      }

      private addToolbar (){
        /*var showContaminationLayer = L.Toolbar2.Action.extend({
          options: {
              toolbarIcon: {
                  className: 'fa fa-eye',
                  tooltip: 'View/Hide Contamination Layer'
              },

          },
          addHooks: function () {
            context.toogleAreaVisibility();
          }
        });

        this.toolbar = new L.Toolbar2.Control({
            position: 'topleft',
            className: 'toolbar',
            actions: [showContaminationLayer]
        });
        this.toolbar.addTo(this.map);*/
      }
}
