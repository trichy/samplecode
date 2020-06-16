import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "segment-type-fan",
        templateUrl: "./segment-type-fan.component.html",
        styleUrls:
            [
                "./segment-type-fan.component.css"
            ]
    })
export class SegmentTypeFanComponent
{
    tabSelected: number = 1;
    viewHeight: number;

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    selectedTab(tabNumber: number): void
    {
        this.tabSelected = tabNumber;
    }   

    getFan(): ModelInterfacesAHU.Configuration.Types.IFan
    {
        if ("config_Fan" in this.segment &&
            this.segment["config_Fan"] !== null)
        {
            let config: ModelInterfacesAHU.Configuration.Segments.ISegmentConfig_Fan;

            config = this.segment["config_Fan"];

            if (config.fanList.length > 0)
            {
                return config.fanList[0];
            }
        }

        return null;
    }
}