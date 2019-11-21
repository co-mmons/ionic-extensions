import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatchMediaModule} from "@co.mmons/angular-extensions/browser/match-media";
import {IntlModule} from "@co.mmons/angular-intl";
import {FormHelperModule} from "@co.mmons/ionic-extensions/form-helper";
import {SelectModule} from "@co.mmons/ionic-extensions/select";
import {SpinnerModule} from "@co.mmons/ionic-extensions/spinner";
import {IonicModule} from "@ionic/angular";
import {ButtonsModule} from "@co.mmons/ionic-extensions/buttons";
import {AlignmentMenu} from "./alignment-menu";
import {HtmlEditor} from "./editor";
import {HeadingMenu} from "./heading-menu";
import {InsertMenu} from "./insert-menu";
import {LinkModal} from "./link-modal";
import {ListMenu} from "./list-menu";
import {TextFormatMenu} from "./text-format-menu";
import {Toolbar} from "./toolbar";

export {HtmlEditor} from "./editor";
export {HtmlEditorFeatures} from "./editor-features";

@NgModule({
    imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule, MatchMediaModule, SpinnerModule],
    declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
    exports: [HtmlEditor, IntlModule],
    entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
})
export class HtmlEditorModule {
}
