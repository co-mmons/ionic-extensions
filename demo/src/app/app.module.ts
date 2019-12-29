import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {IntlModule} from "@co.mmons/angular-intl";
import {DateTimePickerModule} from "@co.mmons/ionic-extensions/datetime-picker";

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        IonicModule.forRoot(),
        IntlModule.forRoot(),
        RouterModule.forRoot([]),
        DateTimePickerModule
    ],
    exports: [CommonModule],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
