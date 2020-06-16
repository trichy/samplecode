import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../../descriptor-override/descriptor-instance-wrappers/CDescriptorInstanceWrapper";

@Component
    ({
        selector: "segment-header-base",
        templateUrl: "./segment-header-base.component.html",
        styleUrls:
            [
                "./segment-header-base.component.css"
            ]
    })
export class SegmentHeaderBaseComponent implements OnInit
{
    showOverrideModal: boolean = false;
    
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    descriptorInstanceList: CDescriptorInstanceWrapper[] = [];

    ngOnInit()
    {
    }

    startOverrideModal()
    {
        this.descriptorInstanceList = this.getDescriptorInstanceList();
        this.showOverrideModal = !this.showOverrideModal;
    }
    
    onOverrideModal_OkClick()
    {
        this.afterOverrideCommit();
        this.showOverrideModal = !this.showOverrideModal;
    }
    onOverrideModal_CancelClick()
    {
        this.showOverrideModal = !this.showOverrideModal;
    }

    showOverrideButton(): boolean
    {
        return false;
    }
    getDescriptorInstanceList(): CDescriptorInstanceWrapper[]
    {
        return [];
    }

    afterOverrideCommit(): void
    {
    }
}