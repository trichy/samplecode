import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "coil-segment-options",
        templateUrl: "./coil-segment-options.component.html",
        styleUrls:
            [
                "./coil-segment-options.component.css"
            ]
    })
export class CoilSegmentOptionsComponent implements OnInit
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    ngOnInit()
    {
    }
}