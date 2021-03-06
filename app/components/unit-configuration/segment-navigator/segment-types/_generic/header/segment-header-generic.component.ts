﻿import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { Inject } from "@angular/core";

import * as ModelInterfacesAHU  from "@jci-ahu/data.ahu.model.interfaces";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

@Component
    ({
        selector: "segment-header-generic",
        templateUrl: "./segment-header-generic.component.html",
        styleUrls:
            [
                "./segment-header-generic.component.css"
            ]
    })
export class SegmentHeaderGenericComponent
{
    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorStoreAHU: IDescriptorStoreAHU)
    {
        this.showPencil = true;
    }
    
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    @Input("showPencil")
    showPencil: boolean;

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