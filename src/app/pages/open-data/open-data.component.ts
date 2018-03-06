import { Component, OnInit } from '@angular/core';
import { OpendataService } from '../services/opendata.service';
import { OpenDataFormat, OpenData, OpenDataTopic } from './models/open.data';

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

    this.openDataCards = openDataService.getOpenData();
    this.formats = openDataService.getFormats();
    this.topics = openDataService.getTopics();
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

  getFormatIcon (formatId){

    var result = this.formats.filter(function( format ) {
      return format.id == formatId;
    });

    if (result.length){
      return result[0].icon;
    }
   


    // this.formats.forEach(format => {
    //   if (format.id === formatId){
    //     return format.icon;
    //   }
    // });
    // return "";
  }

}
