import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-unit-summary',
  templateUrl: './unit-summary.component.html',
  styleUrls: ['./unit-summary.component.css']
})
export class UnitSummaryComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        ////when changing tabs, show the nice fade in effect
        //$(".tab-pane").removeClass("active in");

        //$(".tab-pane").addClass("active in");
    }

}
