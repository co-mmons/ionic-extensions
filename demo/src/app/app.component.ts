import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  now = new Date()

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }
}
