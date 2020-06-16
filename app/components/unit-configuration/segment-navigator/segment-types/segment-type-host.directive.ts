import { Directive } from "@angular/core";
import { Input } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Directive
    ({
        selector: "[segment-type-host]"
    })
export class SegmentTypeHostDirective
{
    constructor(public containerReference: ViewContainerRef)
    {
    }

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;
}