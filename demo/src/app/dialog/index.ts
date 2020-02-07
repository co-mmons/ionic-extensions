import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogModule} from "@co.mmons/ionic-extensions/dialog";
import {SelectModule} from "@co.mmons/ionic-extensions/select";
import {IonicModule} from "@ionic/angular";
import {DialogTestBody} from "./body";
import {DialogTestMessage} from "./message";
import {DialogTestPage} from "./page";

@NgModule({
    declarations: [DialogTestMessage, DialogTestPage, DialogTestBody],
    imports: [
        DialogModule,
        IonicModule,
        RouterModule.forChild([{
            path: "", component: DialogTestPage
        }])
    ]
})
export class DialogTestModule {

}
