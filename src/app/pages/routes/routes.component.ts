import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-toolbar'
import 'style-loader!leaflet/dist/leaflet.css';

import { BIService } from '../services/bi.service';

var context;

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})

export class RoutesComponent { map: any;

  area: any;

  toolbar:any;

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };

  constructor (private densityService: BIService){
    this.getDensity();

    context = this;
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
    
      if (!this.map){
        this.init();
      }

      var bounds = L.latLngBounds(points);
      this.map.fitBounds(bounds, {padding: L.point(20, 20)});


      this.area = L.polygon(points, {
          weight: 5,
          color: this.getHeatColour(heatPercentage),
          opacity: 1.0
      }).addTo(this.map);

      
      this.area.bindPopup("Contamination<br><b>" + heatPercentage + " %</b>");

      this.addToolbar();
      
    });
  }

  private init(){
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osm = L.tileLayer(osmUrl);

    this.map = L.map('map',{
      layers:[osm],
      maxBounds: null,
      center: new L.LatLng(48.48988, 1.39638),
      zoom:14,
      maxBoundsViscosity: 1,
      bounceAtZoomLimits: false,
      worldCopyJump: true,
      attributionControl: false
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
    var showContaminationLayer = L.Toolbar2.Action.extend({
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
    this.toolbar.addTo(this.map);
  }

}
