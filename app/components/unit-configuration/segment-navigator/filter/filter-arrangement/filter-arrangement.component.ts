import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { AfterViewInit } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

declare var jquery: any;
declare var $: any;
declare var threeDimensionalPresenterModule: any;

@Component
    ({
        selector: "filter-arrangement",
        templateUrl: "./filter-arrangement.component.html",
        styleUrls:
            [
                "./filter-arrangement.component.css"
            ]
    })
export class FilterArrangementComponent implements AfterViewInit
{
    @Input("filterbank")
    filterBank: ModelInterfacesAHU.Configuration.Types.IFilterBank = null;

    ngOnInit(): void {
        if (this.filterBank.configurationInputs != null) {
            if (this.filterBank.configurationInputs.maximumBankHeight == 0)
                this.filterBank.configurationInputs.maximumBankHeight = 88;
            if (this.filterBank.configurationInputs.maximumBankWidth == 0)
                this.filterBank.configurationInputs.maximumBankWidth = 120;
        }

    }

    ngAfterViewInit()
    {
        $('#btnConfigure').click(function () { threeDimensionalPresenterModule.generateView(); });
        threeDimensionalPresenterModule.initialize();
    }    
}