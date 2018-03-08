import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenData, OpenDataMedia, OpenDataFormat, OpenDataTopic } from '../open-data/models/open.data';
import { BaseService } from './base.service';

@Injectable()
export class OpendataService extends BaseService{

  constructor(public http: HttpClient) {
   super(http);
  }

  // GET OPEN DATA
  public getOpenData():any {
    return this.fakeOpenData;
  }

  // GET FORMATS
  public getFormats():any {
    return this.formats;
  }
  // GET TOPICS
  public getTopics():any {
    return this.topics;
  }

  formats: Array<OpenDataFormat> = [
    new OpenDataFormat("1", "Spreadsheet", "../../../assets/images/html.png"),
    new OpenDataFormat("2", "CSV File", "../../../assets/images/html.png"),
    new OpenDataFormat("3", "ZIP File", "../../../assets/images/html.png"),
    new OpenDataFormat("4", "XML File", "../../../assets/images/html.png"),
    new OpenDataFormat("5", "PDF File", "../../../assets/images/html.png")
  ];

  topics: Array<OpenDataTopic> = [
    new OpenDataTopic("1", "Demographics", "../../../assets/images/html.png"),
    new OpenDataTopic("2", "Transparency", "../../../assets/images/html.png"),
    new OpenDataTopic("3", "Enployment and Skills", "../../../assets/images/html.png"),
    new OpenDataTopic("4", "Environment", "../../../assets/images/html.png"),
    new OpenDataTopic("5", "Transport", "../../../assets/images/html.png"),
    new OpenDataTopic("6", "Art and Culture", "../../../assets/images/html.png")
  ];

  fakeOpenData = [
    new OpenData("1", "Open Data Source title", "Open Data Source Description", new Date(), "by Me",
     [new OpenDataMedia("1", "File ZIP", "http://data.ottawa.ca/en/dataset/5f5731a8-6e27-4158-ab1a-c8016ddb21ee/resource/608fed03-4abf-4fc3-94e2-43205e6b64ed/download/2017-web-visitation.xlsx", "1")],
     [this.topics[0], this.topics[1], this.topics[2]]),
     new OpenData("1", "Open Data Source title", "Open Data Source Description", new Date(), "by Me",
     [new OpenDataMedia("1", "File ZIP", "http://data.ottawa.ca/en/dataset/5f5731a8-6e27-4158-ab1a-c8016ddb21ee/resource/608fed03-4abf-4fc3-94e2-43205e6b64ed/download/2017-web-visitation.xlsx", "2")],
     [this.topics[0]]),
     new OpenData("1", "Open Data Source title", "Open Data Source Description", new Date(), "by Me",
     [new OpenDataMedia("1", "File ZIP", "http://data.ottawa.ca/en/dataset/5f5731a8-6e27-4158-ab1a-c8016ddb21ee/resource/608fed03-4abf-4fc3-94e2-43205e6b64ed/download/2017-web-visitation.xlsx", "3")],
     [this.topics[1], this.topics[2]]),
     new OpenData("1", "Open Data Source title", "Open Data Source Description", new Date(), "by Me",
     [new OpenDataMedia("1", "File ZIP", "http://data.ottawa.ca/en/dataset/5f5731a8-6e27-4158-ab1a-c8016ddb21ee/resource/608fed03-4abf-4fc3-94e2-43205e6b64ed/download/2017-web-visitation.xlsx", "4")],
     [this.topics[3], this.topics[4], this.topics[5]]),
     new OpenData("1", "Open Data Source title", "Open Data Source Description", new Date(), "by Me",
     [new OpenDataMedia("1", "File ZIP", "http://data.ottawa.ca/en/dataset/5f5731a8-6e27-4158-ab1a-c8016ddb21ee/resource/608fed03-4abf-4fc3-94e2-43205e6b64ed/download/2017-web-visitation.xlsx", "5")],
     [this.topics[5]]),
  ];

}
