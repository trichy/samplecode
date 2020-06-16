import { Component } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { Inject } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

import { SegmentHeaderBaseComponent } from "../../../common/segment-header-base/segment-header-base.component";
import { CDescriptorInstanceWrapper } from "../../../descriptor-override/descriptor-instance-wrappers/CDescriptorInstanceWrapper";
import * as FilterInstanceWrappers from "../../../descriptor-override/descriptor-instance-wrappers/filter";
import * as ConstructionOptionInstanceWrappers from "../../../descriptor-override/descriptor-instance-wrappers/construction-options";


@Component
    ({
        selector: "segment-header-filter",
        templateUrl: "./segment-header-filter.component.html",
        styleUrls:
            [
                "./segment-header-filter.component.css"
            ]
    })
export class SegmentHeaderFilterComponent extends SegmentHeaderBaseComponent
{
    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorStoreAHU: IDescriptorStoreAHU)
    {
        super();
    }

    private get segmentFilter(): ModelInterfacesAHU.Configuration.Segments.ISegment_Filter
    {
        return this.segment as ModelInterfacesAHU.Configuration.Segments.ISegment_Filter;
    }

    public get headerCaption(): string
    {
        if (this.segment)
        {
            let caption: string;

            caption = `${this._descriptorStoreAHU.Segment.SegmentType.uiDescription(this.segment.segmentType)}`;

            return caption;
        }

        return "N/A";
    }
    public get apdCaption(): string
    {
        if (this.segment &&
            this.segment.airPressureDrop > 0)
        {
            return this.segment.airPressureDrop.toFixed(2);
        }

        return "-";
    }

    showOverrideButton(): boolean
    {
        return true;
    }
    getDescriptorInstanceList(): CDescriptorInstanceWrapper[]
    {
        let list: CDescriptorInstanceWrapper[] = [];
        let finalFilterBank: ModelInterfacesAHU.Configuration.Types.IFilterBank;

        finalFilterBank = this.segmentFilter.config_Filter.getFinalFilterBank();

        if (finalFilterBank !== null)
        {
            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterDepth(
                "Filter Depth",
                finalFilterBank.filterDepth_DescriptorInstance));

            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterMediaComposite(
                "Filter Media",
                finalFilterBank.filterMediaComposite_DescriptorInstance,
                finalFilterBank.media_DescriptorInstance.enum,
                finalFilterBank.mervRating_DescriptorInstance.enum,
                finalFilterBank.filterEfficiency_DescriptorInstance.enum));

            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterMediaComposite(
                "Spare Filter Media",
                finalFilterBank.spareFilterMediaComposite_DescriptorInstance,
                finalFilterBank.spareMedia_DescriptorInstance.enum,
                finalFilterBank.spareMERVRating_DescriptorInstance.enum,
                finalFilterBank.spareFilterEfficiency_DescriptorInstance.enum));

            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterGaugeType(
                "Gauge Type",
                finalFilterBank.gaugeType_DescriptorInstance));

            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterGaugeRange(
                "Gauge Range",
                finalFilterBank.gaugeRange_DescriptorInstance));

            list.push(new FilterInstanceWrappers.CDescriptorInstanceWrapper_FilterLoadMethod(
                "Load Method",
                finalFilterBank.segmentConfig_Filter.loadMethod_DescriptorInstance));

            list.push(new ConstructionOptionInstanceWrappers.CDescriptorInstanceWrapper_MaterialType(
                "Blank Off Material Type",
                finalFilterBank.segmentConfig_Filter.blankOffMaterialType_DescriptorInstance));

            list.push(new ConstructionOptionInstanceWrappers.CDescriptorInstanceWrapper_MaterialType(
                "Filter Frame Material Type",
                finalFilterBank.segmentConfig_Filter.bulkheadMaterialType_DescriptorInstance));
        }

        return list;
    }
    afterOverrideCommit(): void
    {
        let finalFilterBank: ModelInterfacesAHU.Configuration.Types.IFilterBank;

        finalFilterBank = this.segmentFilter.config_Filter.getFinalFilterBank();

        if (finalFilterBank != null)
        {
            finalFilterBank.media_DescriptorInstance.hasOverride = finalFilterBank.filterMediaComposite_DescriptorInstance.hasOverride;
            finalFilterBank.mervRating_DescriptorInstance.hasOverride = finalFilterBank.filterMediaComposite_DescriptorInstance.hasOverride;
            finalFilterBank.filterEfficiency_DescriptorInstance.hasOverride = finalFilterBank.filterMediaComposite_DescriptorInstance.hasOverride;

            finalFilterBank.spareMedia_DescriptorInstance.hasOverride = finalFilterBank.spareFilterMediaComposite_DescriptorInstance.hasOverride;
            finalFilterBank.spareMERVRating_DescriptorInstance.hasOverride = finalFilterBank.spareFilterMediaComposite_DescriptorInstance.hasOverride;
            finalFilterBank.spareFilterEfficiency_DescriptorInstance.hasOverride = finalFilterBank.spareFilterMediaComposite_DescriptorInstance.hasOverride;
        }
    }
}