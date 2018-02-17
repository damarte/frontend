import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><b>Fiwoo</b> - 2018</span>
    <div class="socials">
      <a href="https://github.com/fiwoo-platform" target="_blank" class="ion ion-social-github"></a>
      <a href="http://www.fiwoo.eu/" target="_blank" class="ion ion-android-globe"></a>
      <a href="https://twitter.com/fiwoo_city" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://es.linkedin.com/company/fiwoo" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
