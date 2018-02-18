import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';



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
            ) {
  }

  onMenuClick(value): void {
    if (value != undefined && value.type == "logout"){
      // TODO LOGOUT
      localStorage.removeItem('access_token');
      this.router.navigate(['../auth/login']);
    }
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => {
        this.user = users.first; 
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
    //console.log('ok');
    this.router.navigate(['./pages/components/notifications']);
  }
  

}
