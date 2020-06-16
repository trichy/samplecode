import { Component, Input } from '@angular/core';
import { OnInit } from "@angular/core";
import * as ModelAHU from "@jci-ahu/data.ahu.model";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import { SpinnerModel } from '../../core/model/spinner.model';

@Component({
	selector: 'unit-configuration-filter-access-options',
	templateUrl: './unit-configuration-filter-access-options-component.html',
	styleUrls: ['./unit-configuration-filter-access-options-component.css']
})

export class UnitConfigurationAccessOptions implements OnInit {

	@Input("segment")
	segment: ModelAHU.Configuration.Segments.CSegment = null;
	openingLeft: ModelAHU.Configuration.Types.COpening = null;
	openingRight: ModelAHU.Configuration.Types.COpening = null;

	currentOpening: ModelAHU.Configuration.Types.COpening = null;
	currentDoor: ModelAHU.Configuration.Types.CDoor = null;
	accessWidthSpinner: SpinnerModel;
	showSpinner: boolean = true;

	private _currentUnitSide: EnumsCommon.Common.E_UnitSide = EnumsCommon.Common.E_UnitSide.Left;

	public get currentUnitSide(): EnumsCommon.Common.E_UnitSide {
		return this._currentUnitSide;
	}
	public set currentUnitSide(value: EnumsCommon.Common.E_UnitSide) {
		if (this._currentUnitSide !== value) {
			this._currentUnitSide = value;

			if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Left) {
				this.currentOpening = this.openingLeft;
			}

			if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Right) {
				this.currentOpening = this.openingRight;
			}

			if (this.currentOpening.DoorList.length === 0) {
				this.currentDoor = null;
			}
			else {
				this.currentDoor = this.currentOpening.DoorList[0];
			}
		}
	}

	ngOnInit(): void {
		this.openingLeft = this.segment.GetOpeningList_Left(false, true)
			.find(i => i.OpeningType === EnumsAHU.Opening.E_OpeningType.Door ||
				i.OpeningType === EnumsAHU.Opening.E_OpeningType.AccessPanel);

		if (!this.openingLeft) {
			this.openingLeft = this.segment.AddDoor(EnumsCommon.Common.E_UnitSide.Left).Opening;
			this.openingLeft.Door.HingeLocationByAirFlowDirection = EnumsAHU.Common.E_AirFlowDirection.Upstream;
			this.openingLeft.Delete();
		}

		this.openingRight = this.segment.GetOpeningList_Right(false, true)
			.find(i => i.OpeningType === EnumsAHU.Opening.E_OpeningType.Door ||
				i.OpeningType === EnumsAHU.Opening.E_OpeningType.AccessPanel);

		if (!this.openingRight) {
			this.openingRight = this.segment.AddDoor(EnumsCommon.Common.E_UnitSide.Right).Opening;
			this.openingRight.Door.HingeLocationByAirFlowDirection = EnumsAHU.Common.E_AirFlowDirection.Downstream;
			this.openingRight.Delete();
		}

		if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Left) {
			this.currentOpening = this.openingLeft;
		}

		if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Right) {
			this.currentOpening = this.openingRight;
		}

		if (this.currentOpening.DoorList.length === 0) {
			this.currentDoor = null;
		}
		else {
			this.currentDoor = this.currentOpening.DoorList[0];
		}
		this.accessWidthSpinner = new SpinnerModel();
		this.accessWidthSpinner.Id = 'access-width-spinner';
		this.accessWidthSpinner.Max = 1000;
		this.accessWidthSpinner.Min = 0;
		this.accessWidthSpinner.Value = 1
		this.accessWidthSpinner.Step = 1;
		this.accessWidthSpinner.Width = 125;
	}
	keyPress(event: any) {
		const pattern = /[0-9\.\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
			event.preventDefault();
		}
	}
}