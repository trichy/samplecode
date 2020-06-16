import { Component, OnInit } from '@angular/core';

@Component({

	selector: 'fan-option',
	templateUrl: './fan-option.component.html',
	styleUrls: ['./fan-option.component.css']
})

export class FanOptionComponent implements OnInit {
	public GeneralShow: boolean;
	public BeltShow: boolean;

	constructor() {
	}

	ngOnInit(): void {
		this.GeneralShow = true;
		this.BeltShow = false;
	}
	public showPanel2(value: boolean): void {
		this.BeltShow = true;
		this.GeneralShow = false;
	}

	public showPanel1(value: boolean): void {
		this.GeneralShow = true;
		this.BeltShow = false;
	}
}