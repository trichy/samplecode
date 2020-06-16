import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { Guid } from "@jci-ahu/shared.guid";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";
import { ShellService } from "@local/app/core/shellServices/shell.service";
import { CabinetSizeRequestModel } from "../../../../models/ShellServicesModel/mock_cabinetSizeRequestModel";
import { CabinetSizeResponseModel } from "../../../../models/ShellServicesModel/mock_cabinetSizeResponseModel";
import { TunnelSelectionRequestModel } from "../../../../models/ShellServicesModel/mock_tunnelSelectionRequestModel";
import { TunnelSelectionResponseModel } from "../../../../models/ShellServicesModel/mock_tunnelSelectionResponseModel";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from 'rxjs';
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";

@Component({
    selector: 'tunnel-selection',
    templateUrl: "./tunnel-selection.component.html",
    styleUrls:
        [
            "./tunnel-selection.component.css"
        ]
})

export class TunnelSelectionComponent implements OnInit {
    @Input("unit")
    _unit: CUnit_ViewModel = null;
    refreshDisabled: boolean = true;
    requestModel: TunnelSelectionRequestModel;
    gridDisable: boolean = false;

    private refreshEnable() {
    }
    public show: boolean = true;

    constructor(
        private cabinetService: ShellService,
        private http: HttpClient) {
        this.requestModel = new TunnelSelectionRequestModel();       
    }

    async refreshCabinetData() {
        await this.getCabinetSizeData(this.requestModel);
    }

    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string {
        return "cabinetSizeResult" + this.gridID.toString();
    }

    ngOnInit() {
        this.cabinetService.cabinetOptionsChange.subscribe((data) => {
            this.model.dataSource = [];
            this.refreshDisabled = false;
            this.gridDisable = true;
        })
        //this.requestModel.Brand = this._unit.model.unitOptions.brandOption;
        //this.requestModel.MinTunnelHeightInches = this._unit.model.unitOptions.unitType;

        this.getCabinetSizeData(this.requestModel)
        this.igGrid.createTable();
    }

    buildCabinetSizeData(tunnelSelectionData: Array<TunnelSelectionResponseModel>, heigthDiff, widthDiff): Array<CabinetSizeResponseModel> {
        let cabinetResponseModel = new Array<CabinetSizeResponseModel>();
        let cabinetSizeModel: CabinetSizeResponseModel;
        tunnelSelectionData.forEach((selectionData, index) => {
            cabinetSizeModel = new CabinetSizeResponseModel();
            cabinetSizeModel.CabinetSizeId = index;
            cabinetSizeModel.CabinetHeight = selectionData.HeightInches + (heigthDiff);
            cabinetSizeModel.CabinetWidth = selectionData.WidthInches + (widthDiff);
            cabinetSizeModel.TopTunnelCabinetHeight = 0;
            cabinetSizeModel.TopTunnelCabinetWidth = 0;
            cabinetResponseModel.push(cabinetSizeModel);
        });
        return cabinetResponseModel;
    }
    calculateDifference(tunnelsize, cabinetSize) {
        if (tunnelsize < cabinetSize) {
            return cabinetSize - tunnelsize;
        } else {
            return tunnelsize - cabinetSize;
        }
    }

    //getCabinetSizeData1 (requestBody) {
   
    //    let cabinetRequestModel: CabinetSizeRequestModel;


    //    cabinetRequestModel = new CabinetSizeRequestModel("SolutionXT", "Indoor", "None", "_2", "6", this._unit.model.unitOptions.minDesignCabHeight,
    //        this._unit.model.unitOptions.minDesignCabWidth, this._unit.model.unitOptions.maxDesignCabHeight, this._unit.model.unitOptions.maxDesignCabWidth);
    //    this.cabinetService.getCabinetSelection(cabinetRequestModel).subscribe(result => {
    //        let cabinetResponseModel = new Array<CabinetSizeResponseModel>();
    //        let cabinetSizeModel: CabinetSizeResponseModel = new CabinetSizeResponseModel();
    //        cabinetSizeModel.CabinetSizeId = 1;
    //        cabinetSizeModel.CabinetHeight = result['CabinetHeight'];
    //        cabinetSizeModel.CabinetWidth = result['CabinetWidth'];
    //        cabinetSizeModel.TopTunnelCabinetHeight = result['TopTunnelCabinetHeight'];
    //        cabinetSizeModel.TopTunnelCabinetWidth = result['TopTunnelCabinetWidth'];
    //        cabinetResponseModel.push(cabinetSizeModel);

    //        this.model.dataSource = cabinetResponseModel;
    //    },
    //        (cabinetError) => {
    //            console.log(cabinetError);
    //        }
    //    )
    //}

    getCabinetSizeData(requestBody) {
        requestBody.MaxTunnelHeightInches = this._unit.model.unitOptions.maxDesignCabHeight;
        requestBody.MaxTunnelWidthInches = this._unit.model.unitOptions.maxDesignCabWidth;
        requestBody.MinTunnelHeightInches = this._unit.model.unitOptions.minDesignCabHeight;
        requestBody.MinTunnelWidthInches = this._unit.model.unitOptions.minDesignCabWidth;
        this.cabinetService.getTunnelSelection(requestBody).subscribe((data) => {
            this.gridDisable = false;
            let tunnelResponse = this.modifyCabinetServiceData(data['Tunnels']);
            if (tunnelResponse && tunnelResponse.length > 0) {
                let cabinetRequestModel: CabinetSizeRequestModel;
                let tunnelData = tunnelResponse[0]

                cabinetRequestModel = new CabinetSizeRequestModel("SolutionXT", "Indoor", "None", "_2", "6", tunnelData.HeightInches, tunnelData.WidthInches, 0, 0);
                this.cabinetService.getCabinetSelection(cabinetRequestModel).subscribe(result => {
                    this.model.dataSource = this.buildCabinetSizeData(tunnelResponse,
                        this.calculateDifference(tunnelData.HeightInches, result['CabinetHeight']),
                        this.calculateDifference(tunnelData.WidthInches, result['CabinetWidth']))
                },
                    (cabinetError) => {
                        console.log(cabinetError);
                    }
                )
            }
        },
            (error) => {
                console.log(error);
                return [];
            }
        )
    }

    model: igGridCfg = {
        primaryId: 'CabinetSizeId',
        dataSource: [],
        columns: [
            {
                headerText: "CabinetSizeId",
                key: "CabinetSizeId",
                dataType: "number",
                allowHiding: true,
                hidden: true
            },

            {
                headerText: "CabinetHeight",
                key: "CabinetHeight",
                dataType: "number",
                width: "200px"
            },
            {
                headerText: "CabinetWidth",
                key: "CabinetWidth",
                dataType: "number",
                width: "200px"
            },
            {
                headerText: "TopTunnelCabinetHeight",
                key: "TopTunnelCabinetHeight",
                dataType: "number",
                width: "200px"
            },
            {
                headerText: "TopTunnelCabinetWidth",
                key: "TopTunnelCabinetWidth",
                dataType: "number",
                width: "200px"
            }

        ],
        show: this.show,
        features:
            [
                {
                    columnKey: "CabinetSizeId",
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
                    name: "Paging",
                    type: "local",
                    pageSize: 5
                },
                {
                    name: "Selection",
                    mode: "row",
                    activation: false,
                    rowSelectionChanging:  (evt, args) => {
                        let selectedRowId = args.row.id;
                        let selectedRowvalue = this.model.dataSource.filter((data) => data['CabinetSizeId'] === selectedRowId)[0];
                        this._unit.model.unitOptions.selectedDesignCabHeight = selectedRowvalue['CabinetHeight'];
                        this._unit.model.unitOptions.selectedDesignCabWidth = selectedRowvalue['CabinetWidth'];
                    }
                  
                },
                {
                    name: "Updating",
                    editMode: "none",
                    enableAddRow: false,
                    enableDeleteRow: false,
                    columnSettings: [
                        {
                            columnKey: "CabinetSizeId",
                            readOnly: true
                        },
                        {
                            columnKey: "CabinetHeight",
                            readOnly: true,
                        },
                        {
                            columnKey: "CabinetWidth",
                            readOnly: true,
                        },
                        {
                            columnKey: "TopTunnelCabinetHeight",
                            readOnly: true,
                        },
                        {
                            columnKey: "TopTunnelCabinetWidth",
                            readOnly: true,
                        }
                    ]
                }
            ]
    }

    ngAfterViewInit() {
        this.igGrid.createTable();
    }

    modifyCabinetServiceData(data: Array<TunnelSelectionResponseModel>) {
        var mappedData = data.map((obj, index) => {
            obj.tunnelSelectionId = index;
            return obj;
        });
        return mappedData;
    }
}