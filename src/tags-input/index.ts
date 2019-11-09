import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {TagsInput} from "./tags-input";

export {TagsInput} from "./tags-input";

@NgModule({
    declarations: [TagsInput],
    exports: [TagsInput],
    imports: [CommonModule, IonicModule, IntlModule, FormsModule, ReactiveFormsModule],
    entryComponents: [TagsInput]
})
export class TagsInputModule {
}
