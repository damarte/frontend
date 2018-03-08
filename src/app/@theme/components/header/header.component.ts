import { Component, Input, OnInit, Inject } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';
import { FiwooService } from '../../../pages/services/fiwoo.service';
import { NbAuthService, NbAuthResult } from "../../../auth/services/auth.service";
import { NB_AUTH_OPTIONS_TOKEN } from "../../../auth/auth.options";
import { getDeepFromObject } from "../../../auth/helpers";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: []
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  provider: string = "";

  userMenu = [{ title: 'Log out', type:"logout" }];

  constructor(private sidebarService: NbSidebarService,
              protected authService: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private router: Router,
              private fiwooService: FiwooService
            ) {
              this.provider = this.getConfigValue("forms.logout.provider");
  }

  onMenuClick(value): void {
    if (value != undefined && value.type == 'logout'){
      this.authService.logout(this.provider).subscribe((result: NbAuthResult) => {
        console.log(result);
        if(result.isSuccess()){
          const redirect = result.getRedirect();
          if (redirect) {
            this.router.navigateByUrl(redirect);
          }
          else{
            this.router.navigateByUrl('/');
          }
        } else {
          console.log('Logout failed');
        }
      });
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

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
