import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {TextareaAutosize} from "./textarea-autosize";

@NgModule({
    declarations: [TextareaAutosize],
    exports: [TextareaAutosize],
    imports: [IonicModule]
})
export class TextareaAutosizeModule {
}