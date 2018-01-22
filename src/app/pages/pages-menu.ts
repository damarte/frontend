import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  /*{
    title: 'Dashboard',
    icon: 'nb-grid-a-outline',
    link: '/pages/charts/echarts',
    home: true,
  },*/
  {
    title:'Dashboards',
    icon: 'nb-grid-a-outline',
    link: '/pages/board',
    home: true,
  },  
  {
    title: 'Devices',
    link: '/pages/devices',
    icon: 'ion-ios-settings',
  },  
  {
    title: 'Environment',
    link: '/pages/charts/echarts',
    icon: 'ion-ios-partlysunny-outline',
    /*children: [
      {
        title: 'Buttons'
        link: '/pages/ui-features/buttons',
      },     
    ],*/
  },
  {
    title: 'Mobility',
    icon: 'ion-ios-location-outline',
    link: '/pages/maps/gmaps',
    /*children: [
      {
        title: 'Accessibility',
        link: '/pages/forms/inputs',
      }, 
      {
        title: 'Road network',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Transport & traffic',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'It connectivity',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Parking',
        link: '/pages/forms/inputs',
      },    
    ],*/
  },
  {
    title: 'Governance',
    icon:'ion-ios-world-outline',
    /*children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      },
    ],*/
  },
  {
    title: 'Economy',
    icon: 'ion-ios-calculator-outline',
    /*children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },      
    ],*/
  },
  {
    title: 'People',
    icon : 'ion-ios-people-outline',
   /* children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },     
    ],*/
  },
  {
    title: 'Living',
    icon: 'ion-ios-home-outline',
    /*children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },     
    ],*/
  },  
  { 
    title: 'Auth', 
    icon: 'ion-ios-locked-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      { 
        title: 'Request Password',
        link: '/auth/request-password', 
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
