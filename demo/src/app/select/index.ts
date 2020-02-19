import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectModule} from "@co.mmons/ionic-extensions/select";
import {IonicModule} from "@ionic/angular";
import {SelectTestPage} from "./page";

@NgModule({
    declarations: [SelectTestPage],
    imports: [
        IonicModule,
        SelectModule,
        RouterModule.forChild([{
            path: "", component: SelectTestPage
        }])
    ]
})
export class SelectTestModule {

}
