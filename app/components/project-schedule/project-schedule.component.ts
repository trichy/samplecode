import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-project-schedule',
  templateUrl: './project-schedule.component.html',
  styleUrls: ['./project-schedule.component.css']
})
export class ProjectScheduleComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        
        ////when changing tabs, show the nice fade in effect
        //$(".tab-pane").removeClass("active in");
        //console.log($("#schedTab").hasClass("active"));
        
        //$("#schedTab").addClass("active in");
        
        //console.log($("#schedTab").hasClass("active"));

        ////console.log($(".tab-pane.active.in").fadeIn(1000));
    }

}
