import {
	Component, Input, SimpleChanges, OnChanges
} from '@angular/core';

declare var $: any;

@Component({
	selector: 'tooltip',
	template: `<i id="{{ getId() }}" 
                 class="sg-status-icons-caution tooltip-icon tooltips" 
                 style="font-style: normal" 
                 data-toggle="tooltip" 
                 data-placement="{{ getPlacement() }}" 
                 title="{{ getTitle() }}" >
               </i>`
})

export class ToolTipComponent implements OnChanges {

	@Input('Id') id: string;
	@Input('Show') show: boolean;
	@Input('Title') title: string;
	@Input('Placement') placement: string;
	@Input('ToolTipClass') toolTipClass: string;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.show.currentValue)
			this.createToolTip();
	}

	public getId(): string {
		return this.id;
	}

	public getPlacement(): string {
		return this.placement || 'top';
	}

	public getTitle(): string {
		return this.title;
	}

	private getToolTipClass(): string {
		return this.toolTipClass;
	}
	// this function get the element from the DOM and create the tooltip widget object
	public createToolTip(): void {
		let idToolTip = `#${this.getId()}`;
		$(idToolTip).tooltip({
			selector: "[data-toggle=tooltip]",
			container: "body",
			tooltipClass: this.getToolTipClass()
		});
	}

}