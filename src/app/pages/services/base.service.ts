import { HttpClient } from '@angular/common/http';

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
  endPointGIS = '/ows?service=wfs&version=2.0.0&request=Getfeature&typeName=s4c:devices1&outputFormat=JSON'; //PROVISIONAL
  endPointDevices = '/devices';
  endPointTemplates = '/templates';
  endPointAttrs = '/attrs';
  endPointHistorics = '/devices/historics';
  endPointAdvanced = '/advanced';
  endPointBasic = '/basic';
  endPointStatementAdd = '/add';
  endPointOpenDataGroups = '/listGroups';
  endPointOpenDataTags = '/listTags';
  endPointOpenDataPackages = '/listPackage';
  endPointOpenDataPackageInfo = '/package';

  //PARAMS
  paramStatementRuleName = 'rule_name';

  //GOOGLE LOGIN
  // http://stg-sac-fase-dos.emergyalabs.com:7000/users/login/google/{idToken}

  //TEST
  urlBase = 'http://stg-sac-fase-dos.emergyalabs.com:4000/api/';
  urlBaseUsers = this.urlBase.concat('user-management');
  urlBaseOpenData = this.urlBase.concat('openData');
  // urlBaseOpenData = 'http://stg-sac-fase-dos-instance-02.emergyalabs.com:11000/openData';
  urlBaseBI = "http://us2.fiwoo.eu:7000/api/bi";
  urlBaseDensityMaps: string = 'http://us2.fiwoo.eu:5000/api/bi';
  urlBaseDataVisualization = this.urlBase.concat('data-visualization');
  urlBaseGIS = this.urlBase.concat('gis');
  // urlBaseGIS = 'https://platform.fiwoo.eu/api/gis';
  // urlBaseDevices = "https://platform.fiwoo.eu/api/device-management";
  urlBaseDevices = this.urlBase.concat('device-management');
  urlBaseStatements = this.urlBase.concat('rules/statements');
  // urlBaseStatements = "http://stg-sac-fase-dos.emergyalabs.com:6000/api/rules/statements";

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


  constructor(public http: HttpClient) {

  }

}
