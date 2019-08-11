import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {ToggleLabels} from "./toggle-labels";

export {ToggleLabels} from "./toggle-labels";

@NgModule({
    declarations: [ToggleLabels],
    exports: [ToggleLabels],
    imports: [CommonModule, IonicModule]
})
export class ToggleLabelsModule {
}
