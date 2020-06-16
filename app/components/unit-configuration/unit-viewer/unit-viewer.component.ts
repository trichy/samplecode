import { Component, OnInit, ViewChild, forwardRef, Output, Inject, EventEmitter, ElementRef, Renderer2 } from "@angular/core";
import { CSegment_ViewModel } from "../../unit-configuration/view-model/CSegment_ViewModel";
import { CUnitBase_ViewModel } from "../../unit-configuration/view-model/CUnitBase_ViewModel";
import { WorkingDataService } from "@local/app/services/working-data.service";
import { UnitViewer3DComponent } from "../../unit-configuration/unit-viewer-3d/unit-viewer-3d.component";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import * as ModelFactoryAHU from "@jci-ahu/data.ahu.model-factory.interfaces";
import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.ahu.enums";
import { Segment } from "@jci-ahu/data.ahu.descriptor-store/lib";
import { ToastrService } from "../../../common/toastr/toastr.service";
import { CSegmentSelected } from "../view-model/CSegmentSelected";
import { IConstructionOptions, ISegmentReference } from "@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Types";
import { Guid } from "@jci-ahu/shared.guid";
import { SegmentApdRequestModel, SegmentApdResponseModel } from "../../../models/mixing-segment"
import { OpeningService } from "../../../core/opening/opening.service";
import { SegmentValidationService } from "../../../core/segment-validation/segment-validation.service";
import { SegmentCoreLengthRequestModel } from "../../../models/mixing-segment/segmentCoreLength.model";
import { SegmentCoreLengthResponseModel } from "../../../models/mixing-segment/segmentCoreLength.model";

import {
    OpeningApdRequestModel,
    OpeningApdResponseModel,
    OpeningSizeRequestModel,
    OpeningSizeResponseModel,
    OpeningTargetFaceAreaRequestModel,
    OpeningTargetFaceAreaResponseModel,
    LouverApdRequestModel,
    LouverApdResponseModel,
    DamperApdRequestModel,
    DamperApdResponseModel,
    SafetyCoverApdRequestModel,
    SafetyCoverApdResponseModel,
    WalkOnSafetyGrateApdRequestModel,
    WalkOnSafetyGrateApdResponseModel
} from "../../../models/opening";
import { SegmentFactoryService } from "../../../core/util/SegmentFactoryService";
declare let $: any;

@Component
    ({
        selector: "unit-viewer",
        templateUrl: "./unit-viewer.component.html",
        styleUrls:
            [
                "./unit-viewer.component.css"
            ]
    })
export class UnitViewerComponent implements OnInit {

    @ViewChild(forwardRef(() => UnitViewer3DComponent))
    private unit3d: UnitViewer3DComponent

    @Output() newSegmentAdded: EventEmitter<any> = new EventEmitter<any>();
    @Output() enableCabinateP: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _openingSide: string = null;

    showOpen: boolean = true;
    isAirFlowon: boolean = false;
    legendUrl: string = 'images/png/Legend.png';

    constructor(private _workingData: WorkingDataService,
        @Inject(ModelFactoryAHU.TOKEN_IModelFactoryAHU) private _factoryAHU: ModelFactoryAHU.IModelFactoryAHU,
        private validationService: SegmentValidationService,
        private _openingService: OpeningService,
        private _segmentFactoryService: SegmentFactoryService,
        private _toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.showOpen = true;
    }

    get workingUnit(): CUnit_ViewModel {
        return this._workingData.WorkingUnit;
    }

    onAirFlow_Click(e: Event) {
        this._workingData.IsAirFlowOn = !this._workingData.IsAirFlowOn;

    }

   

    public showMenu(): void {
        this.showOpen = !this.showOpen;
        var box = $('#box');
        if (!this.showOpen) {
            box.removeClass('hidden');
            box.width('150px');
        }
        else {
            box.width('0');
            setTimeout(function () {
                box.addClass('hidden');
            }, 50);
        }
    }

    public viewChanged(view: number): void {
        this.unit3d.changeView(view);
    }

    public setTunnelFocus(selectedTunnel: object): void {
        this.unit3d.setTunnelFocus(selectedTunnel);
    }

    public onMenuEndDrag(event: any): void {
        if (CSegmentSelected.AirPathSelected) {
            this._segmentFactoryService.AirPathViewModel = CSegmentSelected.AirPathSelected;
            let numSegments = this.workingUnit.segmentList.length;
            let error = this._segmentFactoryService.addSegmentUnit("IP", error => {
                if (error.length === 0) {
                    this.unit3d.unit = this.workingUnit;
                    if (numSegments === 0) {
                        this.unit3d.destroyObjects();
                        this.unit3d.renderObjects();
                    }
                    else {
                        this.unit3d.renderNewSegment();
                    }
                    this.newSegmentAdded.emit("DONE");
                }
                else {
                    this._toastr.error(error);
                }
            });
        }
    }

    public deleteSegment(selectedSegment): void {
        this.unit3d.deleteSegment(selectedSegment);
    }

    public enableCabinateView(event) {
        console.log(event);
        this.enableCabinateP.emit(true);
    }

    public enableAirflowIndicatore() {
        this.isAirFlowon = !this.isAirFlowon;
    } 
} 