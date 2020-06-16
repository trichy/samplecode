import { Component, OnInit, Input, forwardRef, NgZone, Output, ViewChild, AfterViewInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
declare let $: any;
@Component({
	selector: 'pannel',
	template: `<div class="panel panel-primary">
  <div class="panel-heading" style = "background-color:#1bada3">
    {{title}}
    <div class="pull-right">
      <i id="{{controlName}}_accordionHeader" name="{{controlName}}_accordionHeader" class="fa fa-sort-down panel-heading-collapse-expand"></i>
    </div>
  </div>
  <div id="{{controlName}}_accordionBody" name="{{controlName}}_accordionBody">
    <ng-content></ng-content>
  </div>
</div>`,
	//styleUrls: ['./card.component.css'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PannelComponent),
			multi: true
		}
	]
})
export class PannelComponent implements OnInit, AfterViewInit, OnChanges {

	@Input('title') title: string = 'My title';
	@Input('controlName') controlName: string = 'default';
	@Input('Collapse') collapse: boolean;
	@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();


	constructor() { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.collapse.currentValue) {
			let headerName = ` #${this.controlName}_accordionHeader`;
			let bodyName = ` #${this.controlName}_accordionBody`;
			$(headerName).removeClass('close-panel');
			$(headerName).addClass('open-panel');
			//slide panel up
			$(bodyName).slideUp(300);
		}
		else {
			let headerName = ` #${this.controlName}_accordionHeader`;
			let bodyName = ` #${this.controlName}_accordionBody`;
			$(headerName).removeClass('open-panel');
			$(headerName).addClass('close-panel');
			//slide panel down
			$(bodyName).slideDown(300);

		}
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
				this.change.emit(true);
				$(bodyName).slideDown(300);
			}
		});
	}
}
