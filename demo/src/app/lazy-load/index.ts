import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LazyLoadModule} from "@co.mmons/ionic-extensions/lazy-load";
import {IonicModule} from "@ionic/angular";
import {LazyLoadTestPage} from "./page";
import {Subcomponent1} from "./subcomponent1";
import {Subcomponent2} from "./subcomponent2";

@NgModule({
    declarations: [LazyLoadTestPage, Subcomponent1, Subcomponent2],
    imports: [
        CommonModule,
        IonicModule,
        LazyLoadModule,
        RouterModule.forChild([{
            path: "", component: LazyLoadTestPage
        }])
    ]
})
export class LazyLoadTestModule {

}
