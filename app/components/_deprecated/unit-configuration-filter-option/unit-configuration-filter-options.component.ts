import { Component, Inject, OnInit, Output } from '@angular/core';
import { Input, EventEmitter } from "@angular/core";
import { SampleModel } from '../../models/sample.model';
import { ApdRequestModel } from '../../models/unit-configuration/apdRequest.model';
import { ToastrService } from '../../common/toastr/toastr.service';
import { UnitConfigurationFiltersService } from '../../services/unit-configuration-filters.service';
import { ApdResponseModel } from '../../models/unit-configuration/apdResponse.model';
import { SampleService } from '../../services/sample.service';
//import { OptionFilter, FilterMedia, FilterDepth } from '../../models/FilterModels';

import * as DescriptorsAHU from "@jci-ahu/data.ahu.descriptors";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelAHU from "@jci-ahu/data.ahu.model";

import * as EnumsCommon from "@jci-ahu/data.common.enums";

import { DescriptorStoreAHUService } from "@jci-ahu/data.ahu.descriptor-store";
import { DescriptorFilterAHUFilterService } from "@jci-ahu/services.ahu.descriptor-filter";

@Component({
	selector: 'unit-configuration-filter-options',
	templateUrl: './unit-configuration-filter-options.component.html',
	styleUrls: ['./unit-configuration-filter-options.component.css']
})

export class UnitConfigurationFilterOptions implements OnInit {
	@Input("filterbank")
    public filterBank: ModelAHU.Configuration.Types.CFilterBank = null;

    @Output()
    protected apdValueEvent: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		private unitService: UnitConfigurationFiltersService,
		private tostrService: ToastrService,
		private _DESCRIPTOR_FILTER: DescriptorFilterAHUFilterService,
		private _STORE_AHU: DescriptorStoreAHUService,
		@Inject('BASE_APP_API_URL') private baseUrl: string) {
    }

    public async  ngOnInit() {
        this.loadDefaultOptions();
	}
	ngAfterViewInit() {
		//this.loadSavedData();
	}
	keyPress(event: any) {
		const pattern = /[0-9\.\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
			event.preventDefault();
		}
    }


    public apdValue = 'Not Calculated';
    public apdValueSum = '-';
    public enabledBtn: boolean = false;
    public apdRequestModel: ApdRequestModel;
    public apdReponseModel: ApdResponseModel;



    public async loadDefaultOptions() {
        this.calculateValue();
    }


    public calculateValue(): void {
        this.apdRequestModel = new ApdRequestModel();
        this.apdRequestModel.FilterDepth = EnumsAHU.Filter.E_FilterDepth[this.filterBank.FilterDepth];
        this.apdRequestModel.FilterMediaType = EnumsAHU.Filter.E_FilterMediaType[this.filterBank.Media];
        this.apdRequestModel.MervRating = EnumsAHU.Filter.E_FilterMervType[this.filterBank.MERVRating];

        this.unitService.calculateAPD(this.apdRequestModel).subscribe(data => {
            this.apdReponseModel = data;
            if (data.Errors.length >= 1) {
                this.tostrService.error(data.Errors[0].Message);
                console.log(this.apdReponseModel);
                this.apdValue = 'Invalid';
            }
            else {
                this.apdValue = this.apdReponseModel.AirPressureDropInwg.toFixed(2).toString();
                this.refreshApdValueSum();
            }
        }, error => {
                this.tostrService.error(error);
                console.log(error);
                this.apdValue = 'Invalid';
            });
        this.refreshApdValueSum();
    }

    onChangeFilterDepth(): void {
        this.handleFilterDepthChange();
    }

    private async handleFilterDepthChange() {
        if (this.filterBank === null) return;

        this.enabledBtn = true;
        this.apdValue = "Not Calculated";
    }

    onChangeFilterMedia(): void {
        this.handleFilterDepthChange();
    }

    onChangeDFA(): void {
        this.handleFilterDepthChange();
    }

    private refreshApdValueSum() {
        if (this.filterBank == null || isNaN(Number(this.apdValue))) {
            this.apdValueSum = '-';
        }
        else {
            this.apdValueSum = (Number(this.apdValue) + this.filterBank.DirtyFilterAllowanceAPD).toFixed(2);
        }
        this.enabledBtn = false;
        this.apdValueEvent.emit(this.apdValueSum);
    }

}