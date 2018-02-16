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
  /*{
    title: 'Environment',
    link: '/pages/charts/echarts',
    icon: 'ion-ios-partlysunny-outline',    
  },
  {
    title: 'Mobility',
    icon: 'ion-ios-location-outline',
    link: '/pages/maps/gmaps',    
  },
  {
    title: 'Governance',
    icon:'ion-ios-world-outline',    
  },
  {
    title: 'Economy',
    icon: 'ion-ios-calculator-outline',   
  },
  {
    title: 'Living',
    icon: 'ion-ios-home-outline',    
  },*/
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
    title: 'About',
    icon: 'ion-ios-information-outline', 
    link: '/pages/about',  
  }
];
