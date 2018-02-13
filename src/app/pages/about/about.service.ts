import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {

  private items = [
    { name: 'NodeJS', license: 'The MIT License' },
    { name: 'ExpressJS', license: 'The MIT License' },
    { name: 'Angular', license: 'The MIT License' },
    { name: 'MongoDB', license: 'GNU AGPL v3.0' },
    { name: 'FIWARE Orion Context Broker', license: 'GNU AGPL v3.0' },
    { name: 'FIWARE Cygnus', license: 'GNU AGPL v3.0' },
    { name: 'FIWARE NGSI connector to CARTO', license: 'GNU AGPL v3.0' },
    { name: 'FIWARE IoT Agents', license: 'GNU AGPL v3.0' },
    { name: 'FIWARE Perseo CEP', license: 'GNU GPL v2.0' },
    { name: 'FIWARE Cepheus CEP', license: 'GNU GPL v2.0' },
    { name: 'FIWARE Knowage', license: 'GNU AGPL v3.0' },
    { name: 'CKAN', license: 'The MIT License' },
    { name: 'Kurento', license: 'Apache v2.0' },
    { name: 'Nginx', license: 'BSD' },
    { name: 'Docker', license: 'Apache v2.0' },
    { name: 'Android', license: 'Apache v2.0' },
    { name: 'Swift', license: 'Apache v2.0' },
    { name: 'Swagger', license: 'Apache v2.0' },
    { name: 'Ionic', license: 'The MIT License' },
    { name: 'D3', license: 'BSD 3-clause' },

    { name: 'Carto', license: 'BSD 3-clause' },
    { name: 'Leaflet', license: 'BSD 2-clause' },
    { name: 'OpenLayers', license: 'BSD 2-clause' },
    { name: 'OpenStreetMap', license: 'Open Data Commons Open Database License (ODbL)' },
    { name: 'Ambari', license: 'Apache v2.0' },
    { name: 'Impala', license: 'Apache v2.0' },
    { name: 'Elastic Stack (Elasticsearch, Logstash, Kibana)', license: 'Apache v2.0' },
    { name: 'Flume', license: 'Apache v2.0' },
    { name: 'Sqoop', license: 'Apache v2.0' },
    { name: 'Oozie', license: 'Apache v2.0' },
    { name: 'R', license: 'GPL-2 / GPL-3' },
    { name: 'Rstudio', license: 'AGPL' },
    { name: 'MySQL', license: 'GPL v2.0' },
    { name: 'Eclipse', license: 'Eclipse Public License 1.0.' },
    { name: 'Spark', license: 'Apache 2.0' },
    { name: 'Kafka', license: 'Apache 2.0' },
    { name: 'Jenkins', license: 'The MIT License' },
    { name: 'SonarQube', license: 'Lesser GNU General Public License' },
    { name: 'Codacy', license: 'The MIT License' },
    { name: 'Firebase Cloud Messaging (FCM)', license: 'The MIT License' },
    { name: 'Java', license: 'Oracle Binary Code License' },

    { name: 'Vault', license: 'Mozilla Public License 2.0' },
    { name: 'Token Factory', license: 'The MIT License' },
    { name: 'Selenium / Selenium Hub', license: 'Apache 2.0' },
    { name: 'Apache Maven', license: 'Apache 2.0' },
    { name: 'TestNG', license: 'Apache 2.0' },
    { name: 'Doxygen', license: 'GNU GPL v2.0' },
    { name: 'Apache JMeter', license: 'Apache 2.0' },
    { name: 'Postman / postman-bdd', license: 'Apache 2.0' },
    { name: 'Groovy', license: 'Apache 2.0' },
    { name: 'OWASP Zed Attack Proxy Project', license: 'Apache 2.0' },
    { name: 'NMap', license: 'GNU GPL v2.0' },
    { name: 'Allure Test Report tool', license: 'Apache 2.0' },
    { name: 'gulp', license: 'The MIT License' },
    { name: 'Chai-JS syntax', license: 'The MIT License' },
    { name: 'Dialogflow', license: 'Apache 2.0' },
    { name: 'Go', license: 'BSD 3-clause' },
    { name: 'Solidity', license: 'GPL-3.0' },
    { name: 'Python', license: 'PSF LICENSE' },
    { name: 'Protractor', license: 'Artistic License 2.0' },
    { name: 'Jasmine', license: 'The MIT License' },

    { name: 'Gradle', license: 'Apache 2.0' },
    { name: 'Scala', license: 'BSD 3-clause' },
    { name: 'Spring boot', license: 'Apache 2.0' },
    { name: 'Junit', license: 'Eclipse public license 1.0' }
   
  ];

  private userArray: any[];

  constructor() {
    // this.userArray = Object.values(this.users);
  }

  getItems() {
    return this.items;
  }
}
