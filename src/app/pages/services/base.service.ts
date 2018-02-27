import { Http, Headers } from '@angular/http';

let token: any;
let auth: any;


export class BaseService {

  headers = new Headers();

  endPointLogin = '/login';
  endPointLogout = '/users/logout';
  endPointMe = '/me';
  endPointUsers = '/users';
  endPointAssets = '/assets';
  endPointRoles = '/roles';
  endPointResources = '/resources';
  endPointModels = '/models';
  endPointDashboards = '/dashboards';

  //TEST
  urlBaseUsers: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  urlBaseOpenData: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  urlBaseLogin: string = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  urlBI: string = "";
  urlBaseDensityMaps: string = 'http://us2.fiwoo.eu:5000/api/bi/density';
  urlBaseDataVisualization:  string = 'http://stg-sac-fase-dos.emergyalabs.com:8000/data-visualization';

  //PROD
  // urlBaseUsers: string = 'https://platform.fiwoo.eu/api/user-management/users';
  // urlBaseOpenData: string = '';
  // urlBaseLogin: string = 'https://us1.fiwoo.eu:7000/users';
  // urlBI: string = '';
  // urlBaseDensityMaps: string = 'http://us2.fiwoo.eu:5000/api/bi/density'; 
  // urlBaseDataVisualization:  string = 'https://platform.fiwoo.eu/api/data-visualization';

  constructor(public http: Http) {
    token = localStorage.getItem('access_token');

    auth = 'Bearer ' + token;
    auth = auth.replace(/"([^"]+(?="))"/g, '$1');

    console.log('Headers: ', this.headers);
  }

  public configureGET() {
    this.headers = new Headers();
    this.headers.append('Authorization', auth);
  }

  public configureLogin() {
    this.headers = new Headers();
    this.headers.append(
      "Authorization",
      "Basic c2VsZWN0NGNpdGllczp3LUB5N0ZDKX55IzlLdWouYkBfTHRyM24mYW1G"
    );
  }

  public configureOthers() {
    this.headers = new Headers();
    this.headers.append('Authorization', auth);
    this.headers.append('Content-Type', 'application/json');
  }

}