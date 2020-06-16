import { Component, OnInit, Input, forwardRef, NgZone, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
declare let $: any;
@Component({
    selector: 'accordeon-util',
    template: `<div class="panel panel-primary">
  <div class="panel-heading">
    {{title}}
    <i class="fa fa-globe panel-heading-icon"></i>
    <div class="pull-right">
      <i id="{{controlName}}_accordionHeader" name="{{controlName}}_accordionHeader" class="fa fa-sort-down panel-heading-collapse-expand"></i>
    </div>
  </div>
  <div id="{{controlName}}_accordionBody" name="{{controlName}}_accordionBody">
    <ng-content></ng-content>
  </div>
</div>`,
    //styleUrls: ['./accordeon.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AccordeonComponent),
            multi: true
        }
    ]
})
export class AccordeonComponent implements OnInit, AfterViewInit {

    @Input('title') title: string = 'My title';
    @Input('controlName') controlName: string = 'default';

    constructor() { }

    ngOnInit() {
    }


    ngAfterViewInit(): void {

        let headerName = ` #${this.controlName}_accordionHeader`;
        let bodyName = ` #${this.controlName}_accordionBody`;

        $(headerName).click(() => {
            if ($(headerName).hasClass('close-panel')
                || !$(headerName).hasClass('open-panel')) {
                $(headerName).removeClass('close-panel');
                $(headerName).addClass('open-panel');
                //slide panel up
                $(bodyName).slideUp(300);
            }
            else if ($(headerName).hasClass('open-panel')) {
                $(headerName).removeClass('open-panel');
                $(headerName).addClass('close-panel');
                //slide panel down
                $(bodyName).slideDown(300);
            }
        });
    }
}
