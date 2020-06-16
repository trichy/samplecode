import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Inject } from "@angular/core";
import { ViewChild } from "@angular/core";

import { Guid } from "@jci-ahu/shared.guid";
import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";

import { UnitNavigatorComponent } from "../../../unit-navigator/unit-navigator.component";
import { ConstructionOverridesComponent } from "../../../segment-navigator/common/construction-overrides/construction-overrides.component";

import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { CUnit_ViewModel } from "../../../view-model/CUnit_ViewModel";
import { CSegment_ViewModel } from "../../../view-model/CSegment_ViewModel";
import { DescriptorFilters } from "@jci-ahu/services.data-access";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { UnitConfigurationService } from "../../../../../core/unit-configuration/unitConfiguration.service";

@Component({
    selector: 'summary-construction',
    templateUrl: './summary-construction.component.html',
    styleUrls: ['./summary-construction.component.css']
})
export class SummaryConstructionComponent {
    @Input("unitModel")
    unit: CUnit_ViewModel

    @Input("show")
    show: boolean = false;
    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string {
        return "constructionSummaryTable_" + this.gridID.toString();
    }

    selectedSegments = new Array<CSegment_ViewModel>();
    productType: any;
    brandOption: any;
    linearMaterialClassificationType: EnumsAHU.ConstructionOptions.E_MaterialClassificationType =
        EnumsAHU.ConstructionOptions.E_MaterialClassificationType.SegmentLiner;

    treadPlateMaterialTypeClassification: EnumsAHU.ConstructionOptions.E_MaterialClassificationType =
        EnumsAHU.ConstructionOptions.E_MaterialClassificationType.TreadPlate;
    floorMaterialClassificationType: EnumsAHU.ConstructionOptions.E_MaterialClassificationType =
        EnumsAHU.ConstructionOptions.E_MaterialClassificationType.SegmentFloor;

    constructor(
        @Inject(UnitNavigatorComponent) private unitNav: UnitNavigatorComponent,
        private unitConfigService: UnitConfigurationService,
        private _descriptorFilter: DescriptorFilters.DescriptorFilterAHUConstructionOptionsService,

        @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorStore: IDescriptorStoreAHU) {
    }

    formatter = (val) => {
        let list = this._descriptorStore.ConstructionOptions.MaterialType.list();
        let returnVal: string = ''
        list.forEach((item, i) => {
            if (val === item.enum) {
                returnVal = item.uiDescription;
            }
        });
        return returnVal;
    }
    model: igGridCfg = {
        primaryId: "constructionId",
        dataSource: [],
        columns: [
            {
                headerText: "constructionId",
                key: "constructionId",
                dataType: "string",
                allowHiding: true,
                hidden: true
            },
            {
                headerText: "Segment Type",
                key: "segmentType",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Interior Liner",
                key: "interiorLiner",
                dataType: "string",
                width: "auto",
                formatter: this.formatter
            },
            {
                headerText: "Tread Plate",
                key: "treadPlate",
                dataType: "string",
                width: "auto",
                formatter: this.formatter
            },
            {
                headerText: "Wall Insulation",
                key: "wallInsulation",
                dataType: "string",
                width: "auto",
                formatter: (val) => {
                    let list = this._descriptorStore.ConstructionOptions.InsulationType.list();
                    let returnVal: string = ''
                    list.forEach((item, i) => {
                        if (val === item.enum) {
                            returnVal = item.uiDescription;
                        }
                    });
                    return returnVal;
                }
            },
            {
                headerText: "Floor Material",
                key: "floorMaterial",
                dataType: "string",
                width: "auto",
                formatter: this.formatter
            },
            {
                headerText: "Mylar",
                key: "mylar",
                dataType: "string",
                width: "auto"
            }
        ],
        features: [
            {
                columnKey: "accessOptionsId",
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
                name: 'Resizing',
                deferredResizing: false,
                allowDoubleClickToResize: true
            },
            {
                name: 'Selection',
                mode: "row",
                multipleSelection: false,
                activation: false
            },
            
            {
                name: 'Resizing',
                deferredResizing: false,
                allowDoubleClickToResize: true
            },
            
            {
                name: "Paging",
                type: "local",
                pageSize: 5
            }
        ]
    };

    async ngOnInit() {
        if (this.unit.segmentList && this.unit.segmentList.length > 0) {
            this.selectedSegments = this.unit.segmentList.filter((segment) => segment.isSelected === true);
            if (this.selectedSegments.length > 0) {
                this.productType = this.selectedSegments[0].model.unit.productType;
                this.brandOption = this.selectedSegments[0].model.unit.unitOptions.brandOption;
            }
        }
        this.model.features.push({
            name: "Updating",
            enableAddRow: false,
            enableDeleteRow: false,
            editMode: "cell",
            mode: "immediate",
            columnSettings:
                [
                    {
                        columnKey: "constructionId",
                        readOnly: true
                    },
                    {
                        columnKey: "segmentType",
                        readOnly: true
                    },
                    {
                        columnKey: "interiorLiner",
                        readOnly: false,
                        editorType: "combo",
                        editorOptions: {
                            mode: "dropdown",
                            dataSource: await this._descriptorFilter.GetMaterialTypeList(
                                this.productType,
                                this.brandOption,
                                this.linearMaterialClassificationType),
                            textKey: "_uiDescription",
                            valueKey: "_enum"
                        }
                    },
                    {
                        columnKey: "treadPlate",
                        readOnly: false,
                        editorType: "combo",
                        editorOptions: {
                            mode: "dropdown",
                            dataSource: await this._descriptorFilter.GetMaterialTypeList(
                                this.productType,
                                this.brandOption,
                                this.treadPlateMaterialTypeClassification),
                            textKey: "_uiDescription",
                            valueKey: "_enum"
                        }
                    },
                    {
                        columnKey: "wallInsulation",
                        readOnly: false,
                        editorType: "combo",
                        editorOptions: {
                            mode: "dropdown",
                            dataSource: await this._descriptorStore.ConstructionOptions.InsulationType.list(),
                            textKey: "_uiDescription",
                            valueKey: "_enum"
                        }
                    },
                    {
                        columnKey: "floorMaterial",
                        readOnly: false,
                        editorType: "combo",
                        editorOptions: {
                            mode: "dropdown",
                            dataSource: await this._descriptorFilter.GetMaterialTypeList(
                                this.productType,
                                this.brandOption,
                                this.floorMaterialClassificationType),
                            textKey: "_uiDescription",
                            valueKey: "_enum"
                        }
                    },
                    {
                        columnKey: "mylar",
                        readOnly: true
                    }
                ]
        })

        this.getModelData();
        this.igGrid.createTable();
    }

    ngAfterViewInit() {

    }
    ngDoCheck() {
        let segmentsCheck = this.unit.segmentList.filter((segment) => segment.isSelected === true);
        if (this.selectedSegments.length !== segmentsCheck.length) {
            this.selectedSegments = segmentsCheck;
            this.getModelData();
        }
    }

    public getModelData() {
        let modelData = [];

        let summaryModel: any;
        if (this.selectedSegments && this.selectedSegments.length > 0) {
            this.selectedSegments.forEach((selectedSeg) => {
                summaryModel = {
                    constructionId: selectedSeg.model.id,
                    segmentType: selectedSeg.segmentTypeDescription,
                    interiorLiner: selectedSeg.model.interiorMaterialType,
                    treadPlate: selectedSeg.model.treadPlateMaterialTypeComposite,
                    wallInsulation: selectedSeg.model.constructionOptions.insulationType,
                    floorMaterial: selectedSeg.model.floorMaterialType,
                    mylar: selectedSeg.model.constructionOptions.hasMylarOption,
                }

                modelData.push(summaryModel);
            })
        }
        this.model.dataSource = modelData
    }
}