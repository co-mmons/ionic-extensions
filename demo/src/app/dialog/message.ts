import {AfterViewInit, Component, OnInit} from "@angular/core";

@Component({
    template: "tralalala<br/><br/><br/><br/><br/> {{now.getTime()}}"
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
