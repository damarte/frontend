import { Http, Headers } from '@angular/http';

let token: any;
let auth: any;


export class BaseService {

  headers = new Headers();

  endPointLogin = '/login';
  endPointLogout = '/users/logout';
  endPointMe = '/users/me';
  endPointUsers = '/users';
  endPointAssets = '/assets';
  endPointRoles = '/roles';
  endPointResources = '/resources';
  endPointModels = '/models';
  endPointDashboards = '/dashboards';
  endPointDensisty = '/density';
  endPointPrediction = '/prediction';
  endPointGIS = '/ows?service=wfs&version=2.0.0&request=Getfeature&typeName=s4c:devices1&outputFormat=JSON' //PROVISIONAL
  endPointDevices = '/devices'
  endPointAttrs = '/attrs'
  endPointHistorics = '/devices/historics'
  endPointAdvanced = '/advanced'
  endPointBasic = '/basic'
  endPointStatementAdd = '/add'

  //TEST
  urlBaseUsers = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  urlBaseOpenData = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  urlBaseLogin = 'http://stg-sac-fase-dos.emergyalabs.com:7000/users';
  // urlBI = "http://us2.fiwoo.eu:5001/api/bi/";
  // urlBaseDensityMaps: string = 'http://us2.fiwoo.eu:5000/api/bi/density';
  urlBaseBI = "http://192.168.14.38:5001/api/bi";
  urlBaseDensityMaps = 'http://192.168.14.38:5000/api/bi';
  urlBaseDataVisualization = 'http://stg-sac-fase-dos.emergyalabs.com:8000/data-visualization';
  urlBaseGIS = 'https://platform.fiwoo.eu/api/gis';
  urlBaseDevices = "https://platform.fiwoo.eu/api/device-management";
  urlBaseStatements = "http://us3.fiwoo.eu:5000/api/rules/statements";

  //PROD
  // urlBaseUsers = 'https://platform.fiwoo.eu/api/user-management/users';
  // urlBaseOpenData = '';
  // urlBaseLogin = 'https://us1.fiwoo.eu:7000/users';
  // urlBaseBI = '';
  // urlBaseDensityMaps = 'http://us2.fiwoo.eu:5000/api/bi/density'; 
  // urlBaseDataVisualization = 'https://platform.fiwoo.eu/api/data-visualization';
  // urlBaseGIS = 'https://platform.fiwoo.eu/api/gis';
  // urlBaseDevices = "https://platform.fiwoo.eu/api/device-management";
  // urlBaseStatements = "http://us3.fiwoo.eu:5000/api/rules/statements";


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