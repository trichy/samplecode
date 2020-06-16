import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "segment-type-coil",
        templateUrl: "./segment-type-coil.component.html",
        styleUrls:
            [
                "./segment-type-coil.component.css"
            ]
    })
export class SegmentTypeCoilComponent
{
    tabSelected: number = 1;
    viewHeight: number;

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    selectedTab(tabNumber: number): void
    {
        this.tabSelected = tabNumber;
    }
}