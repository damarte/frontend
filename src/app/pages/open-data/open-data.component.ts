import { Component, OnInit } from '@angular/core';
import { OpendataService } from '../services/opendata.service';
import { OpenDataFormat, OpenData, OpenDataTopic, OpenDataMedia } from './models/open.data';

declare var require: any;
const moment = require('moment');

@Component({
  selector: 'app-open-data',
  templateUrl: './open-data.component.html',
  styleUrls: ['./open-data.component.scss']
})
export class OpenDataComponent implements OnInit {

  openDataCards: any[];

  formats: any[];
  topics: any[];

  constructor(openDataService: OpendataService) {

    this.formats = [];
    this.topics = []; 
    this.openDataCards = [];

    openDataService.getTopics().subscribe(data => {
        data.forEach(element => {
          this.topics.push(new OpenDataTopic(element.id, element.name, ""));
        });
    });

    openDataService.getPackages().subscribe(packages => {
        packages.forEach(pack => {
          openDataService.getPackage(pack).subscribe(packageData => {
            if (packageData.tags){
              var tags = [];
              packageData.tags.forEach(tag => {
                tags.push(new OpenDataTopic(tag.id, tag.name, ""));
              });
            }
            if (packageData.resources){
              var resources = [];
              packageData.resources.forEach(resource => {
                if (resource.url.length > 0){
                  this.addFormat(new OpenDataFormat(resource.format));
                  resources.push(new OpenDataMedia(resource, resource.name, resource.url, resource.format));
                }
              });
            }
            this.openDataCards.push(new OpenData(packageData.id, packageData.title, packageData.notes, new Date(), packageData.maintainer, resources, tags));
          });
        });
    });
  }

  ngOnInit() {

  }

  onClickFormat(format: OpenDataFormat){
    console.log(format.name);
  }

  onClickTopic(topic: OpenDataTopic){
    console.log(topic.name);
  }

  onClickCard (card: OpenData){
    console.log(card);
  }


  formatDate (date){
    return (moment(date).format('DD/MM/YY'));
  }

  getFormatIcon(formatName){
    var icon;
    switch (formatName){
        case "ZIP":
            icon =  "../../../assets/images/html.png";
        case "CSV":
            icon =  "../../../assets/images/html.png";
        case "JSON":
            icon =  "../../../assets/images/html.png";
        case "XML":
            icon =  "../../../assets/images/html.png";
        case "HTML":
            icon = "../../../assets/images/html.png";
    }
   return icon
}

  addFormat (format: OpenDataFormat){
    var exists = false;
    this.formats.forEach(thisFormat => {
      if (thisFormat.name == format.name){
        exists = true;
      }
    });
    if (!exists){
      this.formats.push(format);
    }
  }

}
