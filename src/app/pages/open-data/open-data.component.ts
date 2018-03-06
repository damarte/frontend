import { Component, OnInit } from '@angular/core';
import { OpendataService } from '../services/opendata.service';
import { OpenDataFormat, OpenData, OpenDataTopic } from './models/open.data';

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
}
