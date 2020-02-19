import {Component} from "@angular/core";

@Component({
    template: `<ionx-select title="wybierz" overlay="modal" multiple="true"><ionx-select-option value="a">a</ionx-select-option><ionx-select-option value="b">b</ionx-select-option></ionx-select>`
})
export class SelectTestPage {

    constructor() {
    }
}
