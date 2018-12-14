import {NgModule} from "@angular/core";
import {PseudoInput} from "./pseudo-input";

export {PseudoInput} from "./pseudo-input";

@NgModule({
    declarations: [PseudoInput],
    exports: [PseudoInput]
})
export class PseudoInputModule {
}