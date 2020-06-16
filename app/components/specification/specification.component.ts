import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from "@angular/core";

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { Guid } from "@jci-ahu/shared.guid";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";

import { CUnit_ViewModel } from "../unit-configuration/view-model/CUnit_ViewModel";
import { CSegment_ViewModel } from "../unit-configuration/view-model/CSegment_ViewModel";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as DescriptorInterfacesAHU from "@jci-ahu/data.ahu.descriptors.interfaces";

import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

import { IDescriptorStoreCommon } from "@jci-ahu/data.common.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreCommon } from "@jci-ahu/data.common.descriptor-store.interfaces";

import * as ModelFactoryAHU from "@jci-ahu/data.ahu.model-factory.interfaces";
import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import { Inject } from "@angular/core";


@Component({
    selector: 'app-specification',
    templateUrl: './specification.component.html',
    styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {

    public show: boolean = true;

    @Input("unitModel")
    unit: CUnit_ViewModel;
    private _newUnit_jobName = "";
    private _newUnit_product: EnumsCommon.Common.E_ProductType = EnumsCommon.Common.E_ProductType.SolutionYC;
 
    private _newUnit_cabHeight: number = 0;
    private _newUnit_cabWidth: number = 0;
    public _housingThicknessList: DescriptorInterfacesAHU.ConstructionOptions.IDescriptorHousingThickness[] = [];
    private _newUnit_housingThickness: EnumsAHU.ConstructionOptions.E_HousingThickness = EnumsAHU.ConstructionOptions.E_HousingThickness._2;
    airPathList = [];
    productTypeListOptions = [];
    housingThickness = [];

    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) private _storeAHU: IDescriptorStoreAHU,
        @Inject(TOKEN_IDescriptorStoreCommon) private _storeCommon: IDescriptorStoreCommon,
        @Inject(ModelFactoryAHU.TOKEN_IModelFactoryAHU) private _factoryAHU: ModelFactoryAHU.IModelFactoryAHU) {
    }

    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string {
        return "specificationTable" + this.gridID.toString();
    }

    public get newUnit_jobName(): string {
        return this._newUnit_jobName;
    }
    public set newUnit_jobName(value: string) {
        this._newUnit_jobName = value;

    }

    public get newUnit_product(): EnumsCommon.Common.E_ProductType {
        return this._newUnit_product;
    }
    public set newUnit_product(value: EnumsCommon.Common.E_ProductType) {
        this._newUnit_product = value;

    }

    public get newUnit_housingThickness(): EnumsAHU.ConstructionOptions.E_HousingThickness {
        return this._newUnit_housingThickness;
    }
    public set newUnit_housingThickness(value: EnumsAHU.ConstructionOptions.E_HousingThickness) {
        this._newUnit_housingThickness = value;
       
    }

    dataSource = [];

    model: igGridCfg = {
        primaryId: 'createUnit',
        autofitLastColumn: true,
        dataSource: this.dataSource,
        columns: [
            {

                key: "createUnit",
                dataType: "string",
                allowHiding: true,
                hidden: true
            },
            {
                headerText: "Unit Name",
                key: "unitName",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "CFM",
                key: "cfm",
                dataType: "string",
                width: "80px"
            },
            {
                headerText: "Application",
                key: "application",
                dataType: "string",
                width: "100px"
            },
            {
                headerText: "Product Type",
                key: "productType",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "Wall Thickness",
                key: "wallThickness",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Coil Velocity Target",
                key: "coilVelocityTarget",
                dataType: "number",
                width: "150px"
            },
            {
                headerText: "Coil Velocity Tolerance",
                key: "coilVelocityTolerance",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Filter Velocity Target",
                key: "filterVelocityTarget",
                dataType: "number",
                width: "150px"
            },
            {
                headerText: "Filter Velocity Tolerance",
                key: "filterVelocityTolerance",
                dataType: "string",
                width: "150px"
            },
            {
                headerText: "Max. Height",
                key: "maxHeight",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "Max. Width",
                key: "maxWidth",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "Description",
                key: "description",
                dataType: "string",
                width: "250px"
            },
            {
                headerText: "Airpath",
                key: "airpath",
                dataType: "string",
                width: "120px"
            },  
            {
                headerText: "",
                key: "configurebtn",
                dataType: "string",
                width: "80px",
                template: '<button type="button" class="btn btn - custom secondary">Configure</button>'
            },
        ],
        show: this.show,
        features:
            [
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
                    name: "Paging",
                    type: "local",
                    pageSize: 5
                }
            ]
    }

    ngOnInit() {
       
        this._housingThicknessList = this._storeAHU.ConstructionOptions.HousingThickness.list().filter(i => i.enum !== EnumsAHU.ConstructionOptions.E_HousingThickness._0);
        this.airPathList = [
            { "ID": 0, "Name": "Supply Air" },
            { "ID": 1, "Name": "Return Air" },
            { "ID": 2, "Name": "Exaust Air" }
        ];
        this.productTypeListOptions = [
            { "ID": this.newUnit_product, "Name": this.newUnit_product }
        ];
        this.housingThickness = [
            { "ID": this._newUnit_housingThickness, "Name": this._newUnit_housingThickness}
        ]
    this.model.features.push({
    name: "Updating",
    enableAddRow: false,
    enableDeleteRow: false,
    editMode: "cell",
    mode: "immediate",
    columnSettings:
        [
            {
                columnKey: "createUnit",
                readOnly:true
            },
            {
                columnKey: "productType",
                editorType: "combo",
                editorOptions: {
                    mode: "dropdown",
                    dataSource: this.productTypeListOptions,
                }
            },

            {
                columnKey: "application",
                editorType: "combo",
                editorOptions: {
                    mode: "dropdown",
                }
            },
            {
                columnKey: "airpath",
                editorType: "combo",
                editorOptions: {
                    mode: "dropdown",
                    dataSource: this.airPathList,
                    textKey: "Name",
                    valueKey: "ID"
                }
            },

            {
                columnKey: "wallThinkness",
                editorType: "combo",
                editorOptions: {
                    mode: "dropdown",
                    dataSource:this.housingThickness,
                }
            },
            {
                columnKey: "configurebtn",
                readOnly: true
            },

            ]
})
                this.getModelData();
                this.igGrid.createTable();

}

    ngAfterViewInit() {
        this.igGrid.createTable();
        
    }

    public getModelData() {
        let modelData = [];

        let unitDataModel: any;

        unitDataModel = {
            createUnit: 1,
            productType: this._newUnit_product,
            maxHeight: this._newUnit_cabHeight,
            maxWidth: this._newUnit_cabWidth,
            unitName: this.newUnit_jobName,
            cfm: "6000",
            application: "",
            coilVelocityTarget: 500,
            coilVelocityTolerance: "10%",
            filterVelocityTarget: 500,
            filterVelocityTolerance: "10%",
            description: "",
            airpath: "Supply Air",
            wallThinkness: this._newUnit_housingThickness,
            
        }
        
        modelData.push(unitDataModel);

        this.model.dataSource = modelData

    }
 
}
