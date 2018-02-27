import { Http, Headers } from '@angular/http';

let token: any;
let auth: any;


export class BaseService {

    headers = new Headers();

    urlBaseUsers: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
    urlBaseOpenData: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';

    //DENSITY MAPS
    urlBaseDensityMaps: string = 'http://us2.fiwoo.eu:5000/api/bi/density';

    constructor( public http: Http) { 
        token = localStorage.getItem('access_token');
    
        auth = 'Bearer ' + token ;
        auth = auth.replace(/"([^"]+(?="))"/g, '$1');
    
        console.log('Headers: ', this.headers);
      }

      public configureGET(){
        this.headers = new Headers();
        this.headers.append('Authorization', auth);
      }

}