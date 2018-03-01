import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title:'Dashboards',
    icon: 'nb-grid-a-outline',
    link: '/pages/dashboard',
    home: true,
  },  
  {
    title: 'Iot Management',
    link: '',
    icon: 'ion-ios-settings',
    children: [
      {
        title: 'Devices',
        link: '/pages/devices',
        icon: 'ion-ios-ionic-outline'
      },
      {
        title: 'Templates',
        link: '/pages/templates',
        icon: 'ion-ios-browsers-outline'
      }
    ]
  },   
  {
    title: 'Business Inteligence',
    link: '',
    icon: 'ion-ios-pulse',
    children: [
      {
        title: 'Models',
        link: '/pages/models',
        icon: 'ion-ios-copy-outline'
      }, 
      {
        title: 'Density Maps',
        icon: 'ion-ios-location-outline',
        link: '/pages/routes',    
      },    
    ]
  }, 
  {
    title: 'Statements',
    link: '',
    icon: 'ion-ios-list-outline',
    children: [
      {
        title: 'Statements',
        link: '/pages/statements',
        icon: 'ion-ios-compose-outline'
      },   
     
    ]
  },   
  {
    title: 'Users',
    link: '',
    icon: 'ion-ios-person-outline',
    children: [
      {
        title: 'Users',
        link: '/pages/users',
        icon: 'ion-ios-people-outline'
      },   
      {
        title: 'Roles',
        link: '/pages/roles',
        icon: 'ion-ios-paper-outline'
      },      
      {
        title: 'Assets',
        link: '/pages/assets',
        icon: 'ion-ios-home-outline'
      },   
    ]
  },
  {
    title: 'Open Data',
    icon: 'ion-ios-folder-outline', 
    link: '/pages/open-data',  
  },    
  {
    title: 'About',
    icon: 'ion-ios-information-outline', 
    link: '/pages/about',  
  }
];
