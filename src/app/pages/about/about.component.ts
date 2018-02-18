import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent{

  outputs: string;

  settings = {
    pager: {
      perPage: 20
    },
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: {
          placeholder: 'asdaadasdasdasdas'
        }
      },
      license: {
        title: 'License',
        type: 'string',
      }
  
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private aboutService: AboutService) {
    this.source.setSort([{ field: 'name', direction: 'asc' }]);
    this.source.load(aboutService.getItems());
  }


}
