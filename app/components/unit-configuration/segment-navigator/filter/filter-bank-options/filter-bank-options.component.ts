import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";

import { ApdRequestModel } from "@local/app/models/unit-configuration/apdRequest.model";
import { ApdResponseModel } from "@local/app/models/unit-configuration/apdResponse.model";

import { ToastrService } from "@local/app/common/toastr/toastr.service";

import { UnitConfigurationFiltersService } from "@local/app/services/unit-configuration-filters.service";
import { retry } from "rxjs/operators";

@Component
    ({
        selector: "filter-bank-options",
        templateUrl: "./filter-bank-options.component.html",
        styleUrls:
            [
                "./filter-bank-options.component.css"
            ]
    })
export class FilterBankOptionsComponent implements OnInit
{
    constructor(
        private unitService: UnitConfigurationFiltersService,
        private tostrService: ToastrService)
    {
    }

    @Input("filterbank")
    filterBank: ModelInterfacesAHU.Configuration.Types.IFilterBank = null;

    ngOnInit()
    {
    }

    keyPress(event: any)
    {
        const pattern = /[0-9\.\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar))
        {
            event.preventDefault();
        }
    }

    public get cleanAPD(): string
    {
        if (this.filterBank.cleanAPD === 0)
        {
            return "Not Calculated";
        }

        return this.filterBank.cleanAPD.toFixed(2);
    }

    public enabledBtn: boolean = false;
    public apdRequestModel: ApdRequestModel;
    public apdReponseModel: ApdResponseModel;
    
    public calculateCleanAPD(): void
    {
        this.apdRequestModel = new ApdRequestModel();
        this.apdRequestModel.FilterDepth = EnumsAHU.Filter.E_FilterDepth[this.filterBank.filterDepth];
        this.apdRequestModel.FilterMediaType = EnumsAHU.Filter.E_FilterMediaType[this.filterBank.media];
        this.apdRequestModel.MervRating = EnumsAHU.Filter.E_FilterMervType[this.filterBank.mervRating];

        this.unitService.calculateAPD(this.apdRequestModel).subscribe(
            data =>
            {
                this.apdReponseModel = data;
                if (data.Errors.length >= 1)
                {
                    this.tostrService.error(data.Errors[0].Message);
                    console.log(this.apdReponseModel);
                    this.filterBank.cleanAPD = 0;
                }
                else
                {
                    this.tostrService.success("APD Calculation Successful");
                    this.filterBank.cleanAPD = this.apdReponseModel.AirPressureDropInwg;
                }

                this.filterBank.segmentConfig_Filter.segment.airPressureDrop = this.filterBank.cleanAPD + this.filterBank.dirtyFilterAllowanceAPD;
            },
            error =>
            {
                this.tostrService.error(error);
                console.log(error);
                this.filterBank.cleanAPD = 0;
                this.filterBank.segmentConfig_Filter.segment.airPressureDrop = this.filterBank.cleanAPD + this.filterBank.dirtyFilterAllowanceAPD;
            });
    }

    onChangeFilterDepth(): void
    {
        this.handleFilterDepthChange();
    }

    private async handleFilterDepthChange()
    {
        if (this.filterBank === null) return;

        this.enabledBtn = true;
    }

    onChangeFilterMedia(): void
    {
        this.handleFilterDepthChange();
    }

    onChangeDFA(): void
    {
        this.handleFilterDepthChange();
    }
}