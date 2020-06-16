import { Component, OnInit } from '@angular/core';

//declare var jquery: any;
//declare var $: any;

@Component({
  selector: 'app-fan-segment-option',
    templateUrl: './fan-segment-option.component.html',
    styleUrls: ['./fan-segment-option.component.css']
})
export class FanSegmentOptionComponent implements OnInit {

    constructor() { }
    showModal: boolean = false;

    ngOnInit() {

    }

    ngAfterViewInit() {
        //console.log('yo');
        ////when changing tabs, show the nice fade in effect
        //$(".tab-pane").removeClass("active in");

        //$(".tab-pane").addClass("active in");
    }

    toggleModalView() {
        this.showModal = !this.showModal;
    }

}
