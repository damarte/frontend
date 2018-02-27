import { Component } from '@angular/core';

import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { DensityMapService } from '../../services/densitymap.service';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Density Maps</nb-card-header>
      <nb-card-body>
        <div id="map"></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class LeafletComponent {

  map: any;

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };

  constructor (private densityService: DensityMapService){
    this.getDensity();
  }

  coordinates: any[]; 
  private getDensity(){
    var points = [];
    var heatPercentage: any;
      this.densityService.getDensityMap().subscribe(data => {
        console.log(data);
        if (data.length && data.length == 2){
          this.coordinates = data[0].coordinates;
          heatPercentage = data[1].HeatPercentage;
          if (this.coordinates){
            this.coordinates.forEach(coordinate => {
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


        var area =
          L.polygon(points, {
            weight: 5,
            color: this.getHeatColour(heatPercentage),
            opacity: 1.0
        }).addTo(this.map);

       
        area.bindPopup("Contamination<br><b>" + heatPercentage + " %</b>");
        
      });
  }

  //TODO
  //Añadir los puntos dinámicamente.
  //CALCULAR LOS LÍMITES
  //PINTAR AZUL - ROJO DEPENDIENDO DEL PORCENTAJE


  private init(){
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osm = L.tileLayer(osmUrl);
    // map = new L.Map('map', {layers: [osm], center: new L.LatLng(48.48988, 1.39638), zoom: 14 });

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


}
