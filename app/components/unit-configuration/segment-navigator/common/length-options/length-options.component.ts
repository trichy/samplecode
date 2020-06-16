import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { SpinnerModel } from "@local/app/core/model/spinner.model";

@Component
    ({
    selector: "length-options",
    templateUrl: "./length-options.component.html",
    styleUrls: 
        [
            "./length-options.component.css"
        ]
    })
export class LengthOptionsComponent implements OnInit
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    spinnerCfg: SpinnerModel = null;

    private userDefinedGrowthUpstream: ModelInterfacesAHU.Configuration.Types.ISegmentGrowth = null;
    private userDefinedGrowthDownstream: ModelInterfacesAHU.Configuration.Types.ISegmentGrowth = null;
    private userDefinedGrowthInternal: ModelInterfacesAHU.Configuration.Types.ISegmentGrowth = null;

    // #region Core

    public get coreDefault(): number
    {
        return this.segment.coreLength;
    }
    public set coreDefault(value: number)
    {
        // Only Here to Allow for production build to compile
        // coreDefault should be ReadOnly
    }

    public get coreAddition(): number
    {
        return this.userDefinedGrowthInternal.growthLength;
    }
    public set coreAddition(value: number)
    {
        this.userDefinedGrowthInternal.growthLength = value;
        this.userDefinedGrowthInternal.segment.recalculateSegmentLength();
    }

    // #endregion

    // #region Downstream

    public get downDefault(): number
    {
        return this.segment.segmentGrowth_Downstream() - this.downAddition;
    }
    public set downDefault(value: number)
    {
        // Only Here to Allow for production build to compile
        // downDefault should be ReadOnly
    }

    public get downAddition(): number
    {
        return this.userDefinedGrowthDownstream.growthLength;
    }
    public set downAddition(value: number)
    {
        this.userDefinedGrowthDownstream.growthLength = value;
        this.userDefinedGrowthDownstream.segment.recalculateSegmentLength();
    }

    // #endregion

    // #region Upstream

    public get upDefault(): number
    {
        return this.segment.segmentGrowth_Upstream() - this.upAddition;
    }
    public set upDefault(value: number)
    {
        // Only Here to Allow for production build to compile
        // upDefault should be ReadOnly
    }

    public get upAddition(): number
    {
        return this.userDefinedGrowthUpstream.growthLength;
    }
    public set upAddition(value: number)
    {
        this.userDefinedGrowthUpstream.growthLength = value;
        this.userDefinedGrowthUpstream.segment.recalculateSegmentLength();
    }

    // #endregion

    ngOnInit()
    {
        this.loadSpinnerCfg();

        this.userDefinedGrowthUpstream = this.segment.getUserDefinedSegmentGrowth_Upstream();
        this.userDefinedGrowthDownstream = this.segment.getUserDefinedSegmentGrowth_Downstream();
        this.userDefinedGrowthInternal = this.segment.getUserDefinedSegmentGrowth_Internal();
    }

    private loadSpinnerCfg(): void
    {
        this.spinnerCfg = new SpinnerModel();
        this.spinnerCfg.Id = 'spinner';
        this.spinnerCfg.Max = 1000;
        this.spinnerCfg.Min = 0;
        this.spinnerCfg.Value = 0
        this.spinnerCfg.Step = 1;
        this.spinnerCfg.Width = 40;
    }
}