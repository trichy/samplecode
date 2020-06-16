import { Component, OnInit, Input, Inject, ViewChild, OnChanges } from '@angular/core';

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { Guid } from "@jci-ahu/shared.guid";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

import * as ModelAHU from "@jci-ahu/data.ahu.model";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CUnit_ViewModel } from '../../view-model/CUnit_ViewModel';
import { CSegment_ViewModel } from '../../view-model/CSegment_ViewModel';
import { UnitConfigurationService } from '../../../../core/unit-configuration/unitConfiguration.service';

@Component({
    selector: 'summary-filter-options',
    templateUrl: './summary-filter-options.component.html',
    styleUrls: ['./summary-filter-options.component.css']
})
export class SummaryFilterOptionsComponent implements OnInit, OnChanges {

    @Input("unitModel")
    unit: CUnit_ViewModel;

    public show: boolean;
    public updateModel: boolean = false;
    public filterOptionData: any;
    public filterBank: ModelInterfacesAHU.Configuration.Types.IFilterBank;
    public itemList;
    public selectedSegments = new Array<CSegment_ViewModel>();


    constructor(private unitConfigService: UnitConfigurationService, @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorStore: IDescriptorStoreAHU) {
        this.unitConfigService.selectedSegment.subscribe(val => {
            this.selectedSegments = this.unit.segmentList.filter((segment) => segment.isSelected === true);
            this.getModelData();
        });

    }

    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string {
        return "summaryAssistTable" + this.gridID.toString();
    }

    model: any = {
        primaryId: 'segmentType',
        dataSource: [],
        columns: [
            {
                headerText: "Segment Type",
                key: "segmentType",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Filter Depth",
                key: "FilterDepth",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Filter Media",
                key: "filterMediaComposite",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Clean Pressure Drop",
                key: "cleanAPD",
                dataType: "number",
                width: "150px"
            },
            {
                headerText: "Spare Media",
                key: "spareMedia",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Dirty Filter Allowance",
                key: "dirtyFilterAllowanceAPD",
                dataType: "number",
                width: "150px"
            },
            {
                headerText: "Face Velocity",
                key: "faceVelocity",
                dataType: "number",
                width: "100px"
            },
            {
                headerText: "Loaded Pressure Drop",
                key: "fullyLoadedAPD",
                dataType: "string",
                width: "100px"
            },
            {
                headerText: "Gauge Type",
                key: "gaugeType",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Gauge Range",
                key: "gaugeRange",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Maximum Height",
                key: "tbMaxBankHeight",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Maximum Width",
                key: "tbMaxBankWidth",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Filter Loading",
                key: "filterLoading",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "BlackOff Material",
                key: "blankOffMaterial",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Filter Frame Material",
                key: "filterFrameMaterial",
                dataType: "string",
                width: "150px"
            }
        ],
        features:
            [
                {
                    columnKey: "segmentType",
                    readOnly: true
                },

                {
                    name: 'Selection',
                    mode: "row",
                    multipleSelection: false,
                    activation: false
                },
                {
                    columnKey: "id",
                    readOnly: true
                },
                {
                    name: "Filtering",
                },
                {
                    name: "ColumnMoving",
                    mode: "immediate",
                    addMovingDropdown: true,
                    type: "render"
                },
                {
                    name: "Paging",
                    type: "local",
                    pageSize: 5
                }
            ],
        show: this.updateModel

    };

    ngOnInit(): void {
        if (this.unit.segmentList && this.unit.segmentList.length > 0) {
            this.selectedSegments = this.unit.segmentList.filter((segments) => segments.isSelected === true);
        }
        this.selectedSegments.length > 0 ? this.getModelData() : '';
    }


    ngOnChanges(): void {
        if (this.updateModel) {
            this.getModelData();
        }
    }

    ngDoCheck() {

    }

    ngAfterViewInit() {
        this.igGrid.createTable();
    }

    private getModelData(): void {
        let modelData = [];
        if (this.selectedSegments && this.selectedSegments.length > 0) {
            this.selectedSegments.forEach(segment => {
                if (segment.model['config_Filter']) {
                    this.filterBank = segment.model['config_Filter'].filterBankList[0];
                   
                    const result = this._descriptorStore.Filter.FilterGaugeRange.list().filter(item => item['_enum'] == this.filterBank.gaugeRange);
                    
                    let summaryModel = {

                        segmentType: segment.segmentTypeDescription !== undefined && segment.segmentTypeDescription !== 'Undefined' ? segment.segmentTypeDescription : '',
                        FilterDepth: this.filterBank.filterDepth !== undefined && this.filterBank.filterDepth !== 'Undefined' ? this.filterBank.filterDepth.split('_')[1] : '',
                        filterMediaComposite: this.filterBank.filterMediaComposite !== undefined && this.filterBank.filterMediaComposite !== 'Undefined' ? this.filterBank.filterMediaComposite : '',
                        cleanAPD: this.filterBank.cleanAPD !== undefined ? this.filterBank.cleanAPD : '',
                        spareMedia: this.filterBank.spareMedia !== undefined && this.filterBank.spareMedia !== 'Undefined' ? this.filterBank.spareMedia : '',
                        dirtyFilterAllowanceAPD: this.filterBank.dirtyFilterAllowanceAPD !== undefined ? this.filterBank.dirtyFilterAllowanceAPD : '',
                        faceVelocity: this.filterBank.faceVelocity !== undefined ? this.filterBank.faceVelocity : '',
                        fullyLoadedAPD: this.filterBank.fullyLoadedAPD !== undefined ? this.filterBank.fullyLoadedAPD : '',
                        gaugeType: this.filterBank.gaugeType !== undefined && this.filterBank.gaugeType !== 'Undefined' ? this.filterBank.gaugeType : '',
                       // gaugeRange: this.filterBank.gaugeRange !== undefined && this.filterBank.gaugeRange !== 'Undefined' ? this.filterBank.gaugeRange : '',
                        tbMaxBankHeight: this.filterBank.configurationInputs.maximumBankHeight,
                        tbMaxBankWidth: this.filterBank.configurationInputs.maximumBankWidth,
                        blankOffMaterial: this.filterBank.segmentConfig_Filter.blankOffMaterialType,
                        filterFrameMaterial: this.filterBank.segmentConfig_Filter.bulkheadMaterialType,
                        filterLoading: this.filterBank.segmentConfig_Filter.loadMethod,
                        gaugeRange: result[0]['_uiDescription']

                    }
                    
                    modelData.push(summaryModel);
                }
                this.model.dataSource = modelData;
                this.updateModel = true;
            });
        }
    }
}
