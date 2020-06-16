import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { SpinnerModel } from '../../core/model/spinner.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApdRequestModel } from '../../models/unit-configuration/apdRequest.model';
import { ApdResponseModel } from '../../models/unit-configuration/apdResponse.model';

import { DescriptorStoreAHUService } from "@jci-ahu/data.ahu.descriptor-store";
import * as ModelAHU from "@jci-ahu/data.ahu.model";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import { DrainPan } from '@jci-ahu/data.ahu.descriptors/lib';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
 

@Component({
    selector: 'unit-configuration-filter-segment-options',
    templateUrl: './unit-configuration-filter-segment-options.component.html',
    styleUrls: ['./unit-configuration-filter-segment-options.component.css']
})

export class UnitConfigurationFilterSegmentOptions implements OnInit
{
    @Input("filterBank")
    public filterBank: ModelAHU.Configuration.Types.CFilterBank;    
    @ViewChild("downDefaultCtrl") downDefaultCtrl: SpinnerComponent;
    @ViewChild("downAdditionCtrl") downAdditionCtrl: SpinnerComponent;
    @ViewChild("upDefaultCtrl") upDefaultCtrl: SpinnerComponent;
    @ViewChild("upAdditionCtrl") upAdditionCtrl: SpinnerComponent;

    @Input('Show') showSpinner: boolean;
    public drainpan: ModelAHU.Configuration.Types.CDrainPan;
    public materialclassificationtype: EnumsAHU.ConstructionOptions.E_MaterialClassificationType = EnumsAHU.ConstructionOptions.E_MaterialClassificationType.DrainPanLiner;
    private opening: ModelAHU.Configuration.Types.COpening = null;
    private userDefinedGrowthUpstream: ModelAHU.Configuration.Types.CSegmentGrowth = null;
    private userDefinedGrowthDownstream: ModelAHU.Configuration.Types.CSegmentGrowth = null;
    private userDefinedGrowthInternal: ModelAHU.Configuration.Types.CSegmentGrowth = null;
    public totalDown: number = 0;
    public totalUp: number = 0;
    public sppinerCfg: SpinnerModel;

    public _downDefault: number = 0;
    public _upDefault: number = 0;
    constructor(public _descriptor_store: DescriptorStoreAHUService) {
    }

    ngOnInit(): void {
        this.loadSpinnerCfg();
        this.userDefinedGrowthUpstream = this.filterBank.SegmentConfig_Filter.Segment.GetUserDefinedSegmentGrowth_Upstream();
        this.userDefinedGrowthDownstream = this.filterBank.SegmentConfig_Filter.Segment.GetUserDefinedSegmentGrowth_Downstream();
        this.userDefinedGrowthInternal = this.filterBank.SegmentConfig_Filter.Segment.GetUserDefinedSegmentGrowth_Internal();
        this.fillDropDownListObjects(); 
        //this.calculateDownTotal();
        this._downDefault = this.filterBank.SegmentConfig_Filter.Segment.SegmentGrowth_Downstream() - this.userDefinedGrowthDownstream.GrowthLength;
        this._upDefault = this.filterBank.SegmentConfig_Filter.Segment.SegmentGrowth_Upstream() - this.userDefinedGrowthUpstream.GrowthLength;

        this.calculateDownTotal();
        this.calculateUpTotal();
    }    

    public get coreDefault(): number
    {
        return this.filterBank.SegmentConfig_Filter.Segment.CoreLength;
    }
    
    public set coreDefault(value: number)  {
        this.filterBank.SegmentConfig_Filter.Segment.CoreLength = value;
    }

    public get coreAddition(): number
    {
        return this.userDefinedGrowthInternal.GrowthLength;
    }

    public set coreAddition(value: number)
    {
        this.userDefinedGrowthInternal.GrowthLength = value;
        this.userDefinedGrowthInternal.Segment.RecalculateSegmentLength();
    }

    public get downDefault(): number
    {
        return this._downDefault;
    }

    public set downDefault(value: number) {
        this.calculateDownTotal();
    }

    public get downAddition(): number
    {
        return this.userDefinedGrowthDownstream.GrowthLength;
    }

    public set downAddition(value: number)    {
        this.userDefinedGrowthDownstream.GrowthLength = value;
        this.userDefinedGrowthDownstream.Segment.RecalculateSegmentLength();
        this.calculateDownTotal();
    }

    public get upDefault(): number
    {
        return this._upDefault;
    }

    public set upDefault(value: number) {    
        this.calculateUpTotal();
    }

    public get upAddition(): number
    {
        return this.userDefinedGrowthUpstream.GrowthLength;
    }

    public set upAddition(value: number) {              
        this.userDefinedGrowthUpstream.GrowthLength = value;
        this.userDefinedGrowthUpstream.Segment.RecalculateSegmentLength();   
        this.calculateUpTotal();
    }
    
    @Input() segmentData: ApdResponseModel;

    ngOnChanges(data: any) 
    {
        if (data.segmentData && data.segmentData.currentValue) 
        {
            this.filterBank.SegmentConfig_Filter.Segment.CoreLength = data.segmentData.currentValue.CoreLength;
        }        
    }    

    private async fillDropDownListObjects() {
        if (this.filterBank === null || this.filterBank === undefined) return;
        if (this.filterBank) {
            this.opening = this.filterBank.SegmentConfig_Filter.Segment.GetOpeningList(false, false).find(i => i.OpeningType === EnumsAHU.Opening.E_OpeningType.DrainPan);
        }
        if (this.opening) {
            this.drainpan = this.opening.DrainPan();
        }
    }

    private loadSpinnerCfg(): void {
        this.sppinerCfg = new SpinnerModel();
        this.sppinerCfg.Id = 'sppiner';
        this.sppinerCfg.Max = 1000;
        this.sppinerCfg.Min = 0;
        this.sppinerCfg.Value = 0
        this.sppinerCfg.Step = 1;
        this.sppinerCfg.Width = 40;
    }   

    private calculateDownTotal(): void {
        this.totalDown = this.downDefault + this.downAddition;
    }

    private calculateUpTotal(): void {
        this.totalUp = this.upDefault + this.upAddition;
    }
}