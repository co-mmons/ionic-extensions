import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogModule} from "@co.mmons/ionic-extensions/dialog";
import {IonicModule} from "@ionic/angular";
import {DialogTestMessage} from "./message";
import {DialogTestPage} from "./page";

@NgModule({
    declarations: [DialogTestMessage, DialogTestPage],
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
