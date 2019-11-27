import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {VirtualScrollHelper} from "./virtual-scroll-helper";

export {VirtualScrollHelper} from "./virtual-scroll-helper";

@NgModule({
    declarations: [VirtualScrollHelper],
    exports: [VirtualScrollHelper],
    imports: [CommonModule, IonicModule],
})
export class VirtualScrollHelperModule {
}
