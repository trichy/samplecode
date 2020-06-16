import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { Inject } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

@Component
    ({
        selector: "segment-header-coil",
        templateUrl: "./segment-header-coil.component.html",
        styleUrls:
            [
                "./segment-header-coil.component.css"
            ]
    })
export class SegmentHeaderCoilComponent
{
    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorStoreAHU: IDescriptorStoreAHU)
    {
    }
    
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    public get headerCaption(): string
    {
        if (this.segment)
        {
            let caption: string;

            caption = `${this._descriptorStoreAHU.Segment.SegmentType.uiDescription(this.segment.segmentType)}`;

            if (this.segment.segmentTypeSuffix > 0)
            {
                caption += ` - ${this.segment.segmentTypeSuffix}`; 
            }

            return caption;
        }

        return "N/A";
    }

    toggleOverrideModal()
    {
    }
}