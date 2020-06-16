import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-unit-selection',
  templateUrl: './unit-selection.component.html',
  styleUrls: ['./unit-selection.component.css']
})
export class UnitSelectionComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        //console.log('yo');
        ////when changing tabs, show the nice fade in effect
        //$(".tab-pane").removeClass("active in");
        
        //$(".tab-pane").addClass("active in");
	}

	btnSaveAsClicked() {


	}

}
