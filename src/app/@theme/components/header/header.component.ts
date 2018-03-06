import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';
import { FiwooService } from '../../../pages/services/fiwoo.service';
import { error } from 'selenium-webdriver';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: []
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  // userMenu = [{ title: 'Profile' }, { title: 'Log out', type:"logout" }];
  userMenu = [{ title: 'Log out', type:"logout" }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router: Router,
              private fiwooService: FiwooService        
            ) {
  }

  onMenuClick(value): void {
    if (value != undefined && value.type == "logout"){
      // TODO LOGOUT
      localStorage.removeItem('access_token');
      localStorage.removeItem('email');

      // TODO WHEN LOGOUT WORKS, CHANGE IT
      this.router.navigate(['../auth/login']);

      // this.fiwooService.doLogout().subscribe(
      //   data => {
      //     this.fiwooService.isLoggedIn = false;
      //     this.router.navigate(['../auth/login']);
      //   }, error => {

      //   }
      // );
    }
  }

  ngOnInit() {
    this.fiwooService.getMe().subscribe((user: any) => {
        this.user = user; 
      });
     
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


  goToNotifications(){
    
    this.router.navigate(['../pages/notifications']);
  }
  

}
