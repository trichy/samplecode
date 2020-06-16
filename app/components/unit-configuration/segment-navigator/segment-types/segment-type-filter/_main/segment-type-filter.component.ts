import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "segment-type-filter",
        templateUrl: "./segment-type-filter.component.html",
        styleUrls:
            [
                "./segment-type-filter.component.css"
            ]
    })
export class SegmentTypeFilterComponent
{
    tabSelected: number = 1;
    viewHeight: number;

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    selectedTab(tabNumber: number): void
    {
        this.tabSelected = tabNumber;
    }   

    getFilterBank(): ModelInterfacesAHU.Configuration.Types.IFilterBank
    {
        if ("config_Filter" in this.segment &&
            this.segment["config_Filter"] !== null)
        {
            let config: ModelInterfacesAHU.Configuration.Segments.ISegmentConfig_Filter;

            config = this.segment["config_Filter"];

            if (config.filterBankList.length > 0)
            {
                return config.filterBankList[0];
            }
        }

        return null;
    }
}