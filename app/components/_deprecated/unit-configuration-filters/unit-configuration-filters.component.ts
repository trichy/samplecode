import { Component, Inject, OnInit, ViewChild, ElementRef, AfterContentChecked} from '@angular/core';
import { Input } from "@angular/core";
import { OnDestroy } from "@angular/core";

import { SampleModel } from '../../models/sample.model';
import { ToastrService } from '../../common/toastr/toastr.service'; 
import { UnitConfigurationFiltersService } from '../../services/unit-configuration-filters.service';
import { ApdRequestModel } from '../../models/unit-configuration/apdRequest.model';
import { ApdResponseModel } from '../../models/unit-configuration/apdResponse.model';
import { SampleService } from '../../services/sample.service';

//import { OptionFilter, FilterMedia, FilterDepth } from '../../models/FilterModels';

import * as DescriptorsAHU from "@jci-ahu/data.ahu.descriptors";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelAHU from "@jci-ahu/data.ahu.model";

import * as EnumsCommon from "@jci-ahu/data.common.enums";

import { DescriptorStoreAHUService } from "@jci-ahu/data.ahu.descriptor-store";
import { DescriptorFilterAHUFilterService } from "@jci-ahu/services.ahu.descriptor-filter";
import { UnitConfigurationFilterSegmentOptions } from '../unit-configuration-filter-segment-options/unit-configuration-filter-segment-options.component';
import { ModelAccessAHUService } from '@jci-ahu/services.ahu.model-access';
import { FlatFilterOverrideComponent } from '../flat-filter-override/flat-filter-override.component';

@Component({
    selector: 'unit-configuration-filters',
    templateUrl: './unit-configuration-filters.component.html',
    styleUrls: ['./unit-configuration-filters.component.css']
})
export class UnitConfigurationFiltersComponent implements OnInit, OnDestroy
{
    private _notifySubscriptions: (() => void)[] = [];

    @ViewChild('mainBox') elementView: ElementRef;
    public viewHeight: number;
    @ViewChild(UnitConfigurationFilterSegmentOptions) filterSegment: UnitConfigurationFilterSegmentOptions;

    private _filterBank: ModelAHU.Configuration.Types.CFilterBank = null;

    @Input("filterbank")
    public set filterBank(value: ModelAHU.Configuration.Types.CFilterBank)
    {
        this.clearNotificationSubscriptions();

        this._filterBank = value;

        if (this._filterBank !== null)
        {
            this._notifySubscriptions.push(
                this._filterBank.SubscribeNotify((propName: string) => this.OnNotify(propName)));
        }
    }
    public get filterBank(): ModelAHU.Configuration.Types.CFilterBank
    {
        return this._filterBank;
    }

    public apdValueSum = '-';
    showModal: boolean;

    public filterDepthList: DescriptorsAHU.Filter.CDescriptorFilterDepth[] = [];
    public filterMediaList: DescriptorsAHU.Filter.CDescriptorFilterMediaType[] = [];

    //public apdValue = 'Not Calculated';
    //public enabledBtn: boolean = false;
    //public apdRequestModel: ApdRequestModel;
    //public apdReponseModel: ApdResponseModel;
    public websiteBaseUrl = '';
    public tabSelected: number = 1;
    public showSpinner: boolean = false;
    public segmentResponseBody: ApdResponseModel;

    public savedFilterOptions: any;

    public get headerCaption(): string
    {
        if (this.filterBank !== null)
        {
            let caption: string;

            caption =
                `${this._STORE_AHU.Segment.GetUIDescription_SegmentType(this.filterBank.SegmentConfig_Filter.Segment.SegmentType)}`;

            return caption;
        }

        return "N/A";
    }
    public get filterBankTypeCaption(): string
    {
        if (this.filterBank !== null)
        {
            let caption: string;

            caption =
                `${this._STORE_AHU.Filter.GetUIDescription_FilterBankType(this.filterBank.FilterBankType)}`;

            return caption;
        }

        return "N/A";
    }

    constructor(
        private unitService: UnitConfigurationFiltersService,
        private tostrService: ToastrService,
        private _DESCRIPTOR_FILTER: DescriptorFilterAHUFilterService,
        private _STORE_AHU: DescriptorStoreAHUService,
        @Inject('BASE_APP_API_URL') private baseUrl: string)
    {
        this.websiteBaseUrl = baseUrl;
    }

    ngAfterContentInit()
    {
        if (this.elementView)
        {
            this.viewHeight = this.elementView.nativeElement.clientHeight;
            //console.log("this is here", this.elementView);

        }

    }
    ngOnInit() 
    {
        this.populateDefaultFilterOptions();
        this.showModal = false;

    }
    ngAfterViewInit()
    {

        //this.loadSavedData();
    }
    ngOnDestroy()
    {
        this.clearNotificationSubscriptions();
    }

    public clearNotificationSubscriptions()
    {
        let f: (() => void);

        while (f = this._notifySubscriptions.pop())
        {
            f();
        }
    }
    private OnNotify(propName: string)
    {
        if (propName === ModelAHU.Configuration.Types.CFilterBank.FIELD_FilterDepth ||
            propName === ModelAHU.Configuration.Types.CFilterBank.FIELD_Media)
        {
            //this.enabledBtn = true;
            //this.apdValue = "Not Calculated";
        }
    }

    onSegmentSelected() {
        let reqBody = new ApdRequestModel();
        if (this.filterBank) {
            reqBody.FilterMediaType = EnumsAHU.Filter.E_FilterMediaType[this.filterBank.Media];
            reqBody.FilterDepth = EnumsAHU.Filter.E_FilterDepth[this.filterBank.FilterDepth];
        }

        this.unitService.calculateAPD(reqBody).subscribe((data) => {
            if (data.Errors.length >= 1) {
                this.tostrService.error(data.Errors[0].Message);
            }
            if (data) {
                this.segmentResponseBody = data;
            }
        },
            error => {
                this.tostrService.error(error);
                console.log("Error accured while requesting API" + error);
            })
    }

    loadSavedData()
    {

        if (localStorage.getItem('filterConfigSave') != null)
        {
            this.savedFilterOptions = <any>JSON.parse(localStorage.getItem('filterConfigSave') || '');
            this.populateSavedFilterOptions();
        }
        else
        {
            this.populateDefaultFilterOptions();
        };
    }

    selectedTab(tabNumber: number): void
    {
        console.log(tabNumber);
        this.tabSelected = tabNumber;
        this.showSpinner = this.tabSelected === 2;

        switch (tabNumber) {

            case 1:
                break;
            case 2:
                this.onSegmentSelected();
                break;

            default:
        }
    }   

    private async populateDefaultFilterOptions() 
    {
        if (this.filterBank === null) return;

        this.filterSegment.filterBank = this.filterBank;

        //this.filterDepthList = await this._DESCRIPTOR_FILTER.GetFilterDepthList(
        //    this.filterBank.SegmentConfig_Filter.Segment.Unit.ProductType,
        //    this.filterBank.SegmentConfig_Filter.Segment.Unit.UnitOptions.BrandOption,
        //    this.filterBank.SegmentConfig_Filter.Segment.SegmentType,
        //    this.filterBank.FilterBankType);

        //this.filterMediaList = await this._DESCRIPTOR_FILTER.GetFilterMediaTypeList_ByFilterDepth(
        //    this.filterBank.SegmentConfig_Filter.Segment.Unit.ProductType,
        //    this.filterBank.SegmentConfig_Filter.Segment.Unit.UnitOptions.BrandOption,
        //    this.filterBank.SegmentConfig_Filter.Segment.SegmentType,
        //    this.filterBank.FilterBankType,
        //    this.filterBank.FilterDepth);

        //this.calculateValue();

        //this.sampleService.getOptionFilter(this.websiteBaseUrl).subscribe(
        //    response => {                           
        //        this.optionFilter = response;  
        //        this.selectedFilterDepth = this.optionFilter.filterDepth.filter(f => f.is_default === true)[0];
        //        this.filterMedia = this.optionFilter.filterMedia.filter(f => f.option3 == this.selectedFilterDepth.option3);
        //        this.selectedFilterMedia = this.filterMedia.filter(fm => fm.option3 == this.selectedFilterDepth.option3)[0];
        //        this.calculateValue();
        //    },
        //    error => {
        //        alert('An error ocurred. Make sure you are connected to the internet.');
        //        console.log(error);
        //    });
    }
    private populateSavedFilterOptions() {
        //this.sampleService.getOptionFilter(this.websiteBaseUrl).subscribe(
        //    response => {
        //        this.optionFilter = response;
        //        this.selectedFilterDepth = this.optionFilter.filterDepth.filter(f => f.option3 == this.savedFilterOptions.filterDepth)[0];
        //        this.filterMedia = this.optionFilter.filterMedia.filter(f => f.option3 == this.selectedFilterDepth.option3);
        //        this.selectedFilterMedia = this.filterMedia.filter(fm => fm.option4 == this.savedFilterOptions.filterMedia)[0];
        //        this.calculateValue();
        //    },
        //    error => {
        //        alert('An error ocurred. Make sure you are connected to the internet.');
        //        console.log(error);
        //    });

    }  


    apdValueSumHandler(apdSum: string) {
        this.apdValueSum = apdSum;
    }

    toggleModalView() {
        this.showModal = !this.showModal;
    }
}
