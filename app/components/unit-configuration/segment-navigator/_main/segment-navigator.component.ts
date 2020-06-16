import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "segment-navigator",
        templateUrl: "./segment-navigator.component.html",
        styleUrls:
            [
                "./segment-navigator.component.css"
            ]
    })
export class SegmentNavigatorComponent
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    @Output() deleteSegment: EventEmitter<any> = new EventEmitter();

    isCoilSegment(): boolean
    {
        if ("config_Coil" in this.segment)
        {
            return true;
        }

        return false;
    }
    isFanSegment(): boolean
    {
        if ("config_Fan" in this.segment)
        {
            return true;
        }

        return false;
    }
    isFilterSegment(): boolean
    {
        if ("config_Filter" in this.segment)
        {
            return true;
        }

        return false;
    }

    isGenericSegment(): boolean
    {
        if (this.isCoilSegment() ||
            this.isFanSegment() ||
            this.isFilterSegment())
        {
            return false;
        }

        return true;
    }
}