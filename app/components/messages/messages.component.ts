import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        ////when changing tabs, show the nice fade in effect
        //$(".tab-pane").removeClass("active in");

        //$(".tab-pane").addClass("active in");
    }

}
