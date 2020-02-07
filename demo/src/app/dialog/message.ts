import {AfterViewInit, Component, OnInit} from "@angular/core";

@Component({
    template: "tralalala {{now.getTime()}}"
})
export class DialogTestMessage implements OnInit, AfterViewInit {

    constructor() {
    }

    now: Date = new Date();

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
