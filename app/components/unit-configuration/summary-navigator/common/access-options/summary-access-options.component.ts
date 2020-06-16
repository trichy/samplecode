import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Inject } from "@angular/core";
import { ViewChild } from "@angular/core";

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { Guid } from "@jci-ahu/shared.guid";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";

import { UnitNavigatorComponent } from "../../../unit-navigator/unit-navigator.component";
import { AccessOptionsComponent } from "../../../segment-navigator/common/access-options/access-options.component";

import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { CUnit_ViewModel } from "../../../view-model/CUnit_ViewModel";
import { CSegment_ViewModel } from "../../../view-model/CSegment_ViewModel";
import { UnitConfigurationService } from "../../../../../core/unit-configuration/unitConfiguration.service";
@Component({

    selector: 'summary-access-options',
    templateUrl: './summary-access-options.component.html',
    styleUrls: ['./summary-access-options.component.css']
})

export class SummaryAccessOptionsComponent {

    public show: boolean = true;

    @Input("unitModel")
    unit: CUnit_ViewModel
    selectedSegments = new Array<CSegment_ViewModel>();
    constructor(
        @Inject(UnitNavigatorComponent) private unitNav: UnitNavigatorComponent,
        private unitConfigService: UnitConfigurationService) {
    }

    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string {
        return "summaryAccessTable" + this.gridID.toString();
    }

    model: igGridCfg = {
        primaryId: 'segmentType',
        dataSource: [],
        columns: [
            {
                headerText: "accessOptionsId",
                key: "accessOptionsId",
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
                headerText: "Location",
                key: "location",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "Add Access",
                key: "addAccess",
                dataType: "string",
                width: "120px"
            },
            {
                headerText: "Access Type",
                key: "accessType",
                dataType: "string",
                width: "120px"
            },
            
            { headerText: "Access Width", key: "accessWidth", dataType: "string", width: "150px" },
            { headerText: "View Port", key: "viewPort", dataType: "string", width: "120px" },
            { headerText: "Fastener", key: "fastener", dataType: "string", width: "100px" },
            { headerText: "Hinge", key: "hinge", dataType: "string", width: "100px" },
            { headerText: "Safety Latch", key: "safetyLatch", dataType: "string", width: "120px" },
            { headerText: "Test Port", key: "testPort", dataType: "string", width: "100px" },
            { headerText: "Spare Gasket", key: "spareGasket", dataType: "string", width: "120px" },
            { headerText: "Door Swing", key: "doorSwing", dataType: "string", width: "120px" },
            { headerText: "Noncontact Safety-Interlock Switch", key: "safetyInterlock", dataType: "string", width: "200px" },
        ],
        show: this.show,
        features:
            [
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
                    name: "Selection",
                    mode: "row",
                    multipleSelection: false,
                    activation: false
                },
                {
                    name: "Paging",
                    type: "local",
                    pageSize: 5
                }
            ]
    }

    ngOnInit() {
        this.selectedSegments = this.unit.segmentList.filter((segment) => segment.isSelected === true);
        this.getModelData();
    }

    ngAfterViewInit() {
        this.igGrid.createTable();
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

        //To get all segments Selected across airpaths


        if (this.unit.segmentList && this.unit.segmentList.length > 0) {
            this.selectedSegments = this.unit.segmentList.filter((segment) => segment.isSelected === true);
            let currentDoor: ModelInterfacesAHU.Configuration.Types.IDoor;
            let currentOpening: ModelInterfacesAHU.Configuration.Types.IOpening;
            let summaryModel: any;
            if (this.selectedSegments && this.selectedSegments.length > 0) {
                this.selectedSegments.forEach((selectedSeg) => {
                    currentOpening = selectedSeg.model.getOpeningList(false, true)
                        .find(i => i.openingType === EnumsAHU.Opening.E_OpeningType.Door ||
                            i.openingType === EnumsAHU.Opening.E_OpeningType.AccessPanel)

                    if (currentOpening) {
                        currentDoor = currentOpening.doorList[0]

                        summaryModel = {
                            accessOptionsId: currentOpening.id,
                            segmentType: selectedSeg.segmentTypeDescription,
                            location: "Left",
                            addAccess: !currentOpening.isDeleted,
                            accessType: currentOpening.isDeleted ? "" : currentOpening.openingType,
                            accessWidth: currentOpening.isDeleted ? "" : currentOpening.accessWidth,
                            viewPort: currentOpening.isDeleted ? "" : currentDoor.viewportType,
                            fastener: currentOpening.isDeleted ? "" : currentDoor.fastenerType,
                            hinge: currentOpening.isDeleted ? "" : currentDoor.hingeLocationByAirFlowDirection,
                            safetyLatch: currentOpening.isDeleted ? "" : currentDoor.hasSafetyLatch,
                            testPort: currentOpening.isDeleted ? "" : currentDoor.hasTestPort,
                            spareGasket: currentOpening.isDeleted ? "" : currentDoor.hasSpareGasket,
                            doorSwing: currentOpening.isDeleted ? "" : currentDoor.swingDirection,
                            safetyInterlock: currentOpening.isDeleted ? "" : currentDoor.hasInterlock
                        }
                    } else {
                        summaryModel = {
                            segmentType: selectedSeg.segmentTypeDescription,
                            location: "Left",
                            addAccess: false,
                            accessType: "",
                            accessWidth: "",
                            viewPort: "",
                            fastener: "",
                            hinge: "",
                            safetyLatch: "",
                            testPort: "",
                            spareGasket: "",
                            doorSwing: "",
                            safetyInterlock: ""
                        }
                    }
                    modelData.push(summaryModel);
                })
            }
        }
        this.model.dataSource = modelData
    }
}
