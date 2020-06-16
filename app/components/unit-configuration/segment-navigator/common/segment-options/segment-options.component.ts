import { Component } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "segment-options",
        templateUrl: "./segment-options.component.html",
        styleUrls:
            [
                "./segment-options.component.css"
            ]
    })
export class SegmentOptionsComponent
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    getDrainPan(): ModelInterfacesAHU.Configuration.Types.IDrainPan
    {
        let opening: ModelInterfacesAHU.Configuration.Types.IOpening;

        if (this.segment)
        {
            opening = this.segment.getOpeningList_Bottom(false, false).find(i => i.drainPan() !== null);

            if (opening)
            {
                return opening.drainPan();
            }
        }

        return null;
    }
}