import { Inject } from '@angular/core';
import { CSegmentSelected } from "../../components/unit-configuration/view-model/CSegmentSelected";
import { CSegment_ViewModel } from "../../components/unit-configuration/view-model/CSegment_ViewModel";
import { CUnitBase_ViewModel } from "../../components/unit-configuration/view-model/CUnitBase_ViewModel";
import { CAirPath_ViewModel } from "../../components/unit-configuration/view-model/CAirPath_ViewModel";
import { IConstructionOptions, ISegmentReference, IConstructionOptions_SurfaceDetail } from "@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Types";
import { SegmentValidationService } from "../segment-validation/segment-validation.service";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import { WorkingDataService } from "@local/app/services/working-data.service";
import { Guid } from "@jci-ahu/shared.guid";
import { Segment } from "@jci-ahu/data.ahu.descriptor-store/lib";
import * as ModelFactoryAHU from "@jci-ahu/data.ahu.model-factory.interfaces";
import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import { IFactory_ConstructionOptions_SurfaceDetail } from '@jci-ahu/data.ahu.model-factory.interfaces/lib/Configuration/Types';
import {
    SegmentApdRequestModel,
    SegmentApdResponseModel,
    SegmentWeightRequestModel,
    SegmentWeightResponseModel
} from "../../models/mixing-segment";
import { ToastrService } from "../../common/toastr/toastr.service";

import { SegmentCoreLengthRequestModel } from "../../models/mixing-segment/segmentCoreLength.model";

import { OpeningService } from "../../core/opening/opening.service";

import {
    OpeningApdRequestModel,
    OpeningApdResponseModel,
    OpeningSizeRequestModel,
    OpeningSizeResponseModel,
    OpeningTargetFaceAreaRequestModel,
    OpeningTargetFaceAreaResponseModel,
    LouverSizeRequestModel,
    LouverSizeResponseModel,
    LouverApdRequestModel,
    LouverApdResponseModel,
    DamperSizeRequestModel,
    DamperSizeResponseModel,
    DamperApdRequestModel,
    DamperApdResponseModel,
    SafetyCoverApdRequestModel,
    SafetyCoverApdResponseModel,
    WalkOnSafetyGrateApdRequestModel,
    WalkOnSafetyGrateApdResponseModel
} from "../../models/opening";

import { TunnelSelectionRequestModel } from "../../models/ShellServicesModel/mock_tunnelSelectionRequestModel";
import { TunnelSelectionResponseModel } from "../../models/ShellServicesModel/mock_tunnelSelectionResponseModel";

import { ShellService } from '../../core/shellServices/shell.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs/internal/Observable';
import { COpening_ViewModel } from '@local/app/components/unit-configuration/view-model/COpening_ViewModel';

export class SegmentFactoryService {

    private mouseOver: boolean;
    private _airPath: CAirPath_ViewModel;
    private _segmentWeightRequest: SegmentWeightRequestModel;
    private _segmentWeightResponse: SegmentWeightResponseModel;

    private _segmentCoreLengthRequestModel: SegmentCoreLengthRequestModel;
    segmentLengthVal = "";

    public set AirPathViewModel(value: CAirPath_ViewModel) {
        this._airPath = value;
    }

    private _openingSide: string = 'Front';

    constructor(
        private _workingData: WorkingDataService,
        @Inject(ModelFactoryAHU.TOKEN_IModelFactoryAHU)
        private _factoryAHU: ModelFactoryAHU.IModelFactoryAHU,
        private validationService: SegmentValidationService,
        private _openingService: OpeningService,
        private cabinetService: ShellService,
        private _toastr: ToastrService) {

    }

    get workingUnit(): CUnit_ViewModel {
        return this._workingData.WorkingUnit;
    }

    public addSegmentUnit(segmentType: string, callback: any) {
        let error: string = "";

        try {
            switch (segmentType) {
                case "IP":
                    {
                        this._segmentCoreLengthRequestModel = new SegmentCoreLengthRequestModel();
                        let unitData = this.workingUnit.model;

                        this._segmentCoreLengthRequestModel.UnitType = EnumsAHU.UnitOptions.E_UnitType.Indoor;
                        this._segmentCoreLengthRequestModel.SegmentType = EnumsAHU.Segment.E_SegmentType.IP;
                        this._segmentCoreLengthRequestModel.TopOpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
                        this._segmentCoreLengthRequestModel.BottomOpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
                        this._segmentCoreLengthRequestModel.LeftOpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
                        this._segmentCoreLengthRequestModel.RightOpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;


                        //this._segmentCoreLengthRequestModel.UnitType = unitData.unitOptions.unitType;
                        //this._segmentCoreLengthRequestModel.SegmentType = EnumsAHU.Segment.E_SegmentType.IP;
                        //this._segmentCoreLengthRequestModel.ProductType = unitData.productType;
  
                        this.validationService.getSegmentCoreLenght(this._segmentCoreLengthRequestModel).subscribe(
                            resp => {
                                console.log(resp.Corelength);
                                this.segmentLengthVal = resp.Corelength;
                                this.newSegmentIP();

                                    callback(error)
                            });
                            break;
                    }
            }
        }
        catch (ex) {
            error = ex;
            callback(error)
        }
        //return error;
    }

    private newSegmentIP(): void {
        let segmentReference: ISegmentReference;
        let segmentVM: CSegment_ViewModel;
        let baseUnitVM: CUnitBase_ViewModel;
        let openingIpVm: COpening_ViewModel;
        let geometryBase: ModelAHU.Configuration.Types.IGeometry;
        let segmentIP: ModelAHU.Configuration.Segments.ISegment_IP;
        let segmentIpBackGeo: ModelAHU.Configuration.Types.IGeometry = null;
        let baseUnit: ModelAHU.Configuration.Types.IUnitBase;
        let constructionOptions: IConstructionOptions;
        let unit = this.workingUnit.model;
        let geometryBack: ModelAHU.Configuration.Types.IGeometry = null;
        let openingIP: ModelAHU.Configuration.Types.IOpening;
        let openingIpBackGeo: ModelAHU.Configuration.Types.IGeometry = null;
        let coreLengthValue: number = 0;

        let suffix: number = 0;

        // TODO : Figure out where come from default position
        let y: number = 6;
        let x: number = 0;
        let z: number = 0;
        let existSharedBase: boolean;
        this.mouseOver = false;

        // Get the suffix 
        this._airPath.segmentList.forEach(seg => {
            if (seg.model.segmentType === EnumsAHU.Segment.E_SegmentType.IP) {
                suffix = seg.model.segmentTypeSuffix;
            }
        });

        suffix = suffix + 1;

        this.workingUnit.segmentList.forEach(segment => {
            if (segment.model.segmentType == EnumsAHU.Segment.E_SegmentType.IP) {
                if (segment.openingList) {
                    segment.openingList.forEach(opening => {
                        if (opening.openingType == EnumsAHU.Opening.E_OpeningType.DamperFlush) {
                            openingIpBackGeo = opening.geometry;
                        }
                    });
                }
            }
        });

        // If One segment has ben selected 
        if (CSegmentSelected.segmentMouseOver) {
            geometryBack = CSegmentSelected.segmentMouseOver.geometry;
            let geometry = this._airPath.segmentList[0].model.geometry;
            segmentIpBackGeo = geometry;
            this.mouseOver = true;
        }
        else {
            if (this._airPath.segmentList.length !== 0) {
                if (segmentIpBackGeo === null) {

                    let geometry = this._airPath.segmentList[0].model.geometry;
                    if (geometry.x > 0) {
                        this._airPath.segmentList.forEach(seg => {
                            if (seg.model.geometry.x < geometry.x) {
                                geometry = seg.model.geometry;
                            }
                        });
                    }
                    segmentIpBackGeo = geometry;
                }

                geometryBack = segmentIpBackGeo;
            }
        }

        /* Geometry Base */
        geometryBase = this._factoryAHU.Configuration.Types.Geometry.create(this.workingUnit.model);

        if (this.mouseOver) {
            geometryBase.x = geometryBack === null ? x : geometryBack.x + geometryBack.xLength;
            geometryBase.y = geometryBack === null ? y : geometryBack.y;
            geometryBase.z = geometryBack === null ? z : geometryBack.z;
        }
        else {
            geometryBase.x = segmentIpBackGeo === null ? x : segmentIpBackGeo.x;
            geometryBase.y = segmentIpBackGeo === null ? y : segmentIpBackGeo.y;
            geometryBase.z = segmentIpBackGeo === null ? z : segmentIpBackGeo.z;
        }
        

        // TODO: Select the default air path Segment 
        geometryBase.xLength = this._airPath.model.designCabWidth;
        geometryBase.yLength = this._airPath.model.designCabHeight; 
        geometryBase.zLength = coreLengthValue; 

        segmentIP = this._factoryAHU.Configuration.Segments.Segment_IP.create(this.workingUnit.model);
        segmentIP.segmentType = EnumsAHU.Segment.E_SegmentType.IP;
        segmentIP.segmentTypeSuffix = suffix;
        
        // add geometry to segment
        segmentIP.geometry = geometryBase;

       
        segmentIP.coreLength = +this.segmentLengthVal;       
        segmentIP.handOrientation = EnumsAHU.Segment.E_SegmentHandOrientation.FrontToRear;
        segmentIP.unit = unit;

        //#region  Weigh API call
        this._segmentWeightRequest = new SegmentWeightRequestModel();
        Promise.all([
            this.segmentWeightResponse
            //TODO: New API calls created in the future to calculate weight aPI entries.
        ]).then(
            response => {
                this._segmentWeightRequest = new SegmentWeightRequestModel();
                segmentIP.weight = this._segmentWeightResponse.SegmentWeight;

        })
        //#endregion TODO WEIGHT CALL

        constructionOptions = this._factoryAHU.Configuration.Types.ConstructionOptions.create(this.workingUnit.model);

        constructionOptions.surfaceDetail_Top = this.surfaceDetail(1);
        constructionOptions.surfaceDetail_Front = this.surfaceDetail(2);
        constructionOptions.surfaceDetail_Rear = this.surfaceDetail(3);
        constructionOptions.surfaceDetail_Left = this.surfaceDetail(4);
        constructionOptions.surfaceDetail_Right = this.surfaceDetail(5);
        constructionOptions.surfaceDetail_Bottom = this.surfaceDetail(6);

        segmentIP.constructionOptions = constructionOptions;


        //#region Update airPressureDrop in segmentIP 

        forkJoin([this.tunnelSelectionResponse])
            .subscribe(() => forkJoin([this.openingTargetFaceAreaResponse.then(() => this.openingSizeResponse.then(() => this.openingApdResponse))])
                .subscribe(() => {
                    openingIP.openingPressureDrop = this._openingApdResponse.OpeningAPDInWg;
                    forkJoin([
                        this.louverSizeResponse.then(() => this.louverApdResponse),
                        this.damperSizeResponse.then(() => this.damperApdResponse),
                        this.safetyCoverApdResponse,
                        this.walkOnSafetyGrateApdResponse
                    ])
                        .subscribe(() => forkJoin([this.segmentApdResponse])
                            .subscribe(() => segmentIP.airPressureDrop = this._segmentApdResponse.SegmentAPDInWg))
                }));

        openingIP = this._factoryAHU.Configuration.Types.Opening.create(this.workingUnit.model);
        openingIP.airType = EnumsAHU.Common.E_AirType.Inlet;
        openingIP.ductType = EnumsAHU.Opening.E_DuctType.None;
        openingIP.openingPressureDrop = this._openingApdResponse !== undefined ? this._openingApdResponse.OpeningAPDInWg : 0;
        openingIP.openingShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
        openingIP.openingType = EnumsAHU.Opening.E_OpeningType.DamperFlush;
        openingIP.openingVelocity = 795;
        openingIP.safetyScreenMaterialStyle = EnumsAHU.ConstructionOptions.E_MaterialStyle.None;
        openingIP.safetyScreenType = EnumsAHU.Opening.E_SafetyScreenType.None;
        openingIP.unitSide = EnumsCommon.Common.E_UnitSide.Front;
        openingIP.geometry.x = segmentIP.geometry.x; 
        openingIP.geometry.xLength =  0; 
        openingIP.geometry.y = segmentIP.geometry.yLength * 0.303; 
        openingIP.geometry.yLength = segmentIP.geometry.yLength * 0.51825; //this._openingSizeResponse[`Opening_${this._openingSide}H`]
        openingIP.geometry.z = segmentIP.geometry.z + (segmentIP.geometry.zLength * 0.05556)  
        openingIP.geometry.zLength = segmentIP.geometry.zLength * 0.889; //this._openingSizeResponse[`Opening_${this._openingSide}W`]

        openingIP.segment = function () { return segmentIP; }
        this.workingUnit.model.openingList.push(openingIP);


        //#endregion Update airPressureDrop in segmentIP 


        // For the base unit 
        let base: CUnitBase_ViewModel = this.addNewBaseUnit(segmentIP.geometry);

        if (this.mouseOver) {
            this.xOffSetSegments(geometryBase.xLength, geometryBack.x, false);
            this.xOffSetOpeningDoors(geometryBase.xLength, geometryBack.x, false);
            this.xOffSetElectricalOptions(geometryBase.xLength, geometryBack.x, false);
            existSharedBase = this.getSharedBaseUnit(CSegmentSelected.segmentMouseOver, geometryBase.xLength, segmentIP.id);

        }
        else {
            this.xOffSetSegments(geometryBase.xLength, 0, true);
            this.xOffSetOpeningDoors(geometryBase.xLength, 0, true);
            this.xOffSetElectricalOptions(geometryBase.xLength, 0, true);
        }

        if (!existSharedBase)
           this.workingUnit.unitbaseList.push(base);

        this._workingData.WorkingUnit.model.segmentList.push(segmentIP);

        segmentVM = new CSegment_ViewModel(this.workingUnit, segmentIP);
        openingIpVm = new COpening_ViewModel(this.workingUnit, openingIP);
        segmentVM.openingList = [openingIP];
        segmentReference = this._factoryAHU.Configuration.Types.SegmentReference.create(this.workingUnit.model);
        segmentReference.segmentID = segmentIP.id;

        this._airPath.segmentList.push(segmentVM);
        this._airPath.model.segmentReferenceList.push(segmentReference);
        this._workingData.WorkingUnit.model.segmentList.push(segmentIP);
        this._workingData.WorkingUnit.model.openingList.push(openingIP);
        this.workingUnit.segmentList.push(segmentVM);
        this.workingUnit.openinglist.push(openingIpVm);

        console.log(this._workingData);
    }


    private surfaceDetail(side : number): IConstructionOptions_SurfaceDetail {
        let surface = this._factoryAHU.Configuration.Types.ConstructionOptions_SurfaceDetail.create(this.workingUnit.model);
        surface.exteriorMaterialType = this.workingUnit.model.unitOptions.defaultConstructionOptions.exteriorMaterialType;
        surface.exteriorMaterialGauge = this.workingUnit.model.unitOptions.defaultConstructionOptions.exteriorMaterialGauge;
        surface.exteriorPaintType = this.workingUnit.model.unitOptions.defaultConstructionOptions.exteriorPaintType;
        surface.interiorMaterialType = this.workingUnit.model.unitOptions.defaultConstructionOptions.interiorMaterialType;
        surface.interiorMaterialGauge = this.workingUnit.model.unitOptions.defaultConstructionOptions.interiorMaterialGauge;
        surface.interiorPaintType = this.workingUnit.model.unitOptions.defaultConstructionOptions.interiorPaintType;
        switch (side) {
            case 1: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Top; break;
            case 2: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Front; break;
            case 3: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Rear; break;
            case 4: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Left; break;
            case 5: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Right; break;
            case 6: surface.housingThickness = this.workingUnit.model.unitOptions.defaultConstructionOptions.housingThickness_Bottom; break;
        }   
        return surface;
    }

    private addNewBaseUnit(geometrySegment: ModelAHU.Configuration.Types.IGeometry): CUnitBase_ViewModel {
        let baseUnitVM: CUnitBase_ViewModel;
        let baseUnit: ModelAHU.Configuration.Types.IUnitBase;
        baseUnit = this._factoryAHU.Configuration.Types.UnitBase.create(this.workingUnit.model);
        //baseUnit.floorAttachmentType = EnumsAHU.UnitBase.E_UnitBaseAttachmentType.StitchWeld;
        //baseUnit.housingStyle = EnumsAHU.ConstructionOptions.E_HousingStyle.Standard;
        //baseUnit.insulationType = EnumsAHU.UnitBase.E_UnitBaseInsulationType.Foam_2Inch;
        //baseUnit.paintType = EnumsAHU.ConstructionOptions.E_PaintType.ChampagneEnamel_3_to_5_mil;
        //baseUnit.subFloorMaterialGauge = EnumsAHU.ConstructionOptions.E_MaterialGauge._22ga;
        //baseUnit.subFloorMaterialType = EnumsAHU.ConstructionOptions.E_MaterialType.STL_GALV;
        //baseUnit.subFloorPaintType = EnumsAHU.ConstructionOptions.E_PaintType.None;
        //baseUnit.unitBaseMaterialType = EnumsAHU.UnitBase.E_UnitBaseMaterialType.StructuralSteel;
        //baseUnit.upturnedLipHeight = 2;
        //baseUnit.offsetType_Front = EnumsAHU.UnitBase.E_UnitBaseOffsetType.Undefined;
        //baseUnit.offsetType_Rear = EnumsAHU.UnitBase.E_UnitBaseOffsetType.Undefined;
        //baseUnit.offsetType_Left = EnumsAHU.UnitBase.E_UnitBaseOffsetType.Undefined;
        //baseUnit.offsetType_Right = EnumsAHU.UnitBase.E_UnitBaseOffsetType.Undefined;
        baseUnit.geometry.x = geometrySegment.x;
        baseUnit.geometry.y = geometrySegment.y - 6;
        baseUnit.geometry.z = geometrySegment.z;
        baseUnit.geometry.xLength = geometrySegment.xLength;
        baseUnit.geometry.yLength = 6;
        baseUnit.geometry.zLength = geometrySegment.zLength;
        baseUnitVM = new CUnitBase_ViewModel(this.workingUnit, baseUnit);    
        return baseUnitVM;
    }



    private xOffSetElectricalOptions(width: number, position?: number, isFront?: boolean): void {
        this._workingData.WorkingUnit.electricalOptionsList.forEach(op => {
            if (!isFront) {
                if (op.model.geometry.x > position) {
                    op.model.geometry.x = op.model.geometry.x + width;
                }
            }
            else {
                if (op.model.geometry.x >= position) {
                    op.model.geometry.x = op.model.geometry.x + width;
                }
            }
        });
    }


    private xOffSetOpeningDoors(width: number, position?: number, isFront?: boolean): void {
        this._workingData.WorkingUnit.openinglist.forEach(op => {
            if (!isFront) {
                if (op.model.geometry.x > position) {
                    op.model.geometry.x = op.model.geometry.x + width;
                    op.doorlist.forEach(door => {
                        door.model.geometry.x = door.model.geometry.x + width;
                    });
                    op.damperlist.forEach(damper => {
                        damper.model.geometry.x = damper.model.geometry.x + width;
                    });
                    op.standardlist.forEach(standar => {
                        standar.model.geometry.x = standar.model.geometry.x + width;
                    })
                }
            }
            else {
                if (op.model.geometry.x >= position) {
                    op.model.geometry.x = op.model.geometry.x + width;
                    op.doorlist.forEach(door => {
                        door.model.geometry.x = door.model.geometry.x + width;
                    });
                    op.damperlist.forEach(damper => {
                        damper.model.geometry.x = damper.model.geometry.x + width;
                    });
                    op.standardlist.forEach(standar => {
                        standar.model.geometry.x = standar.model.geometry.x + width;
                    });
                }
            }
        });
    }

    private xOffSetSegments(width: number, position?: number, isFront?: boolean) {
        this._workingData.WorkingUnit.segmentList.forEach(seg => {
            if (!isFront) {
                if (seg.model.geometry.x > position) {
                    seg.model.geometry.x = seg.model.geometry.x + width;
                }
            }
            else {
                if (seg.model.geometry.x >= position) {
                    seg.model.geometry.x = seg.model.geometry.x + width;
                }
            }
        });

        this._workingData.WorkingUnit.unitbaseList.forEach(base => {
            if (!isFront) {
                if (base.model.geometry.x > position) {
                    base.model.geometry.x = base.model.geometry.x + width;
                }
            }
            else {
                if (base.model.geometry.x >= position) {
                    base.model.geometry.x = base.model.geometry.x + width;
                }
            }
        });
    }

    private getSharedBaseUnit(segment: ModelAHU.Configuration.Segments.ISegment, width: number, id: Guid): boolean {
        let existSharedBase: boolean;
        let baseGuid: Guid;
        let skidIdGuid: Guid;
        let baseUnit: ModelAHU.Configuration.Types.IUnitBase;
        let segmentReference: ISegmentReference;

        this.workingUnit.model.shippingSkidList.forEach(ship => {
            if (!existSharedBase) {
                ship.segmentReferenceList.forEach(seg => {
                    if (seg.segmentID.toString() === segment.id.toString()) {
                        existSharedBase = true;
                        skidIdGuid = ship.id;
                    }
                });

                if (existSharedBase) {
                    baseGuid = ship.unitBaseReferenceList[0].unitBaseID;
                }
            }
        })

        if (existSharedBase) {
            this.workingUnit.unitbaseList.forEach(base => {
                if (baseGuid.toString() === base.model.id.toString()) {
                    baseUnit = base.model;
                }
            });

            if (baseUnit) {
                baseUnit.geometry.xLength = baseUnit.geometry.xLength + width;
            }

            segmentReference = this._factoryAHU.Configuration.Types.SegmentReference.create(this.workingUnit.model);
            segmentReference.segmentID = id;

            this.workingUnit.model.shippingSkidList.forEach(ship => {
                if (skidIdGuid.toString() == ship.id.toString()) {
                    ship.segmentReferenceList.push(segmentReference);
                }
            });

        }
        return existSharedBase;
    }

    public get segmentWeightResponse() {
        return this.validationService.segmentWeight(this._segmentWeightRequest).then(
            data => this._segmentWeightResponse = data,
            error => this._toastr.error(error));
    }

    private _tunnelSelectionRequest: TunnelSelectionRequestModel;
    private _tunnelSelectionResponse: TunnelSelectionResponseModel;

    private _segmentApdRequest: SegmentApdRequestModel;
    private _segmentApdResponse: SegmentApdResponseModel;

    private _openingApdRequest: OpeningApdRequestModel;
    private _openingApdResponse: OpeningApdResponseModel;

    private _openingSizeRequest: OpeningSizeRequestModel;
    private _openingSizeResponse: OpeningSizeResponseModel;

    private _openingTargetFaceAreaRequest: OpeningTargetFaceAreaRequestModel;
    private _openingTargetFaceAreaResponse: OpeningTargetFaceAreaResponseModel;

    private _louverSizeRequest: LouverSizeRequestModel;
    private _louverSizeResponse: LouverSizeResponseModel;

    private _louverApdRequest: LouverApdRequestModel;
    private _louverApdResponse: LouverApdResponseModel;

    private _damperSizeRequest: DamperSizeRequestModel;
    private _damperSizeResponse: DamperSizeResponseModel;

    private _damperApdRequest: DamperApdRequestModel;
    private _damperApdResponse: DamperApdResponseModel;

    private _safetyCoverApdRequest: SafetyCoverApdRequestModel;
    private _safetyCoverApdResponse: SafetyCoverApdResponseModel

    private _walkOnSafetyGrateApdRequest: WalkOnSafetyGrateApdRequestModel;
    private _walkOnSafetyGrateApdResponse: WalkOnSafetyGrateApdResponseModel;


    private get tunnelSelectionResponse() {
        this._tunnelSelectionRequest = new TunnelSelectionRequestModel();
        this._tunnelSelectionRequest.ProductType = this.workingUnit.model.productType == "Undefined" ? "SolutionYC" : this.workingUnit.model.productType;
        this._tunnelSelectionRequest.Brand = this.workingUnit.model.unitOptions.brandOption == "Undefined" ? "YORKCustom" : this.workingUnit.model.unitOptions.brandOption;
        this._tunnelSelectionRequest.MinTunnelHeightInches = this.workingUnit.model.unitOptions.minDesignCabHeight == 0 ? 50 : this.workingUnit.model.unitOptions.minDesignCabHeight;
        this._tunnelSelectionRequest.MinTunnelWidthInches = this.workingUnit.model.unitOptions.minDesignCabWidth == 0 ? 150 : this.workingUnit.model.unitOptions.minDesignCabWidth;
        this._tunnelSelectionRequest.MaxTunnelHeightInches = this.workingUnit.model.unitOptions.maxDesignCabHeight == 0 ? 50 : this.workingUnit.model.unitOptions.maxDesignCabHeight;
        this._tunnelSelectionRequest.MaxTunnelWidthInches = this.workingUnit.model.unitOptions.maxDesignCabWidth == 0 ? 150 : this.workingUnit.model.unitOptions.maxDesignCabWidth;
        return this.cabinetService.getTunnelSelectionPromise(this._tunnelSelectionRequest).then(
            data => this._tunnelSelectionResponse = data['Tunnels'],
            error => this._toastr.error(error))
    }

    private get segmentApdResponse() {
        // Setting up SideWise SegmentApdRequestModel
        this._segmentApdRequest = new SegmentApdRequestModel();
        this._segmentApdRequest[`${this._openingSide}Opening_OpeningAPDInWg`] = this._openingApdResponse.OpeningAPDInWg;
        this._segmentApdRequest[`${this._openingSide}Opening_LouverAPDInWg`] = this._louverApdResponse.LouverAPDInWg;
        this._segmentApdRequest[`${this._openingSide}Opening_DamperAPDInWg`] = this._damperApdResponse.DamperAirPressureDropInwg;
        this._segmentApdRequest[`${this._openingSide}Opening_SafetyScreenAPDInWg`] = this._safetyCoverApdResponse.SafetyCoverAPDInWg;
        this._segmentApdRequest[`${this._openingSide}Opening_WalkOnSafetyGrateAPDInWg`] = this._walkOnSafetyGrateApdResponse.SafetyCoverAPDInWg;
        return this.validationService.segmentAPD(this._segmentApdRequest).then(
            data => this._segmentApdResponse = data,
            error => this._toastr.error(error));
    }

    private get openingTargetFaceAreaResponse() {
        this._openingTargetFaceAreaRequest = new OpeningTargetFaceAreaRequestModel();
        this._openingTargetFaceAreaRequest.AirVolumeCFM = 37335;
        this._openingTargetFaceAreaRequest.MaxFaceVelocityFPM = 500
        return this._openingService.openingTargetFaceArea(this._openingTargetFaceAreaRequest).then(
            data => this._openingTargetFaceAreaResponse = data,
            error => this._toastr.error(error));
    }

    private get openingSizeResponse() {
        this._openingSizeRequest = new OpeningSizeRequestModel();
        this._openingSizeRequest.ProductType = this.workingUnit.model.productType == "Undefined" ? "SolutionYC" : this.workingUnit.model.productType;
        this._openingSizeRequest.TunnelHeight = this._tunnelSelectionResponse.HeightInches;
        this._openingSizeRequest.TunnelWidth = this._tunnelSelectionResponse.WidthInches;
        this._openingSizeRequest.TargetFaceArea = this._openingTargetFaceAreaResponse.TargetFaceArea;
        return this._openingService.openingSize(this._openingSizeRequest).then(
            data => this._openingSizeResponse = data,
            error => this._toastr.error(error));
    }

    private get openingApdResponse() {
        this._openingApdRequest = new OpeningApdRequestModel();
        this._openingApdRequest.OpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
        this._openingApdRequest.AirVolumeCFM = 37335;
        this._openingApdRequest.OpeningHeight = this._openingSizeResponse[`Opening_${this._openingSide}H`];
        this._openingApdRequest.OpeningWidth = this._openingSizeResponse[`Opening_${this._openingSide}W`];
        this._openingApdRequest.KValue = 2.7;
        return this._openingService.openingApd(this._openingApdRequest).then(
            data => this._openingApdResponse = data,
            error => this._toastr.error(error));
    }

    private get louverSizeResponse() {
        this._louverSizeRequest = new LouverSizeRequestModel();
        this._louverSizeRequest.ProductType = this.workingUnit.model.productType == "Undefined" ? "SolutionYC" : this.workingUnit.model.productType;
        this._louverSizeRequest.TunnelHeight = this._tunnelSelectionResponse.HeightInches;
        this._louverSizeRequest.TunnelWidth = this._tunnelSelectionResponse.WidthInches;
        this._louverSizeRequest.AirVolumeCFM = 37335;
        this._louverSizeRequest.MaxFreeAreaVelocity = 1100;
        this._louverSizeRequest.UnitSide = this._openingSide;
        return this._openingService.louverSize(this._louverSizeRequest).then(
            data => this._louverSizeResponse = data,
            error => this._toastr.error(error));
    }

    private get louverApdResponse() {
        this._louverApdRequest = new LouverApdRequestModel();
        this._louverApdRequest.ProductCode = this.workingUnit.model.productCode;
        this._louverApdRequest.AirVolumeCFM = 37335;
        this._louverApdRequest.LouverHeight = this._louverSizeResponse.LouverHeight;
        this._louverApdRequest.LouverWidth = this._louverSizeResponse.LouverWidth;
        return this._openingService.louverApd(this._louverApdRequest).then(
            data => this._louverApdResponse = data,
            error => this._toastr.error(error));
    }

    private get damperSizeResponse() {
        this._damperSizeRequest = new DamperSizeRequestModel();
        this._damperSizeRequest.ProductType = this.workingUnit.model.productType == "Undefined" ? "SolutionYC" : this.workingUnit.model.productType;
        this._damperSizeRequest.TunnelHeight = this._tunnelSelectionResponse.HeightInches;
        this._damperSizeRequest.TunnelWidth = this._tunnelSelectionResponse.WidthInches;
        this._damperSizeRequest.TargetFaceArea = this._openingTargetFaceAreaResponse.TargetFaceArea;
        this._damperSizeRequest.DamperProduct = EnumsAHU.Damper.E_DamperProduct.AMS60;
        this._damperSizeRequest.DamperBladeOrientation = EnumsAHU.Damper.E_DamperBladeOrientation.Parallel;
        this._damperSizeRequest.DamperConfiguration = EnumsAHU.Damper.E_DamperConfiguration.Full;
        this._damperSizeRequest.DamperBladeDirection = EnumsAHU.Damper.E_DamperBladeDirection.Horizontal;
        this._damperSizeRequest.DamperFlangeMountType = EnumsAHU.Damper.E_DamperFlangeMountType.Front;
        this._damperSizeRequest.OpeningLocation = this._openingSide;
        return this._openingService.damperSize(this._damperSizeRequest).then(
            data => this._damperSizeResponse = data,
            error => this._toastr.error(error));
    }

    private get damperApdResponse() {
        this._damperApdRequest = new DamperApdRequestModel();
        this._damperApdRequest.AirVolumeCFM = 37335;
        this._damperApdRequest.DamperProduct = EnumsAHU.Damper.E_DamperProduct.CBS92;
        this._damperApdRequest.DamperBladeQuantity = 22;
        this._damperApdRequest.DamperHeight = this._damperSizeResponse[`${this._openingSide}Damper_SizeH`];
        this._damperApdRequest.DamperWidth = this._damperSizeResponse[`${this._openingSide}Damper_SizeW`];
        this._damperApdRequest.FaceDamperHeight = 44.13;
        this._damperApdRequest.BypassDamperHeight = 44.13;
        return this._openingService.damperApd(this._damperApdRequest).then(
            data => this._damperApdResponse = data,
            error => this._toastr.error(error));
    }

    private get safetyCoverApdResponse() {
        this._safetyCoverApdRequest = new SafetyCoverApdRequestModel();
        this._safetyCoverApdRequest.AirVolumeCFM = 37335;
        this._safetyCoverApdRequest.SafetyScreenType = EnumsAHU.Opening.E_SafetyScreenType.SafetyScreen;
        this._safetyCoverApdRequest.OpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
        this._safetyCoverApdRequest.OpeningHeight = this._openingSizeResponse[`Opening_${this._openingSide}H`];
        this._safetyCoverApdRequest.OpeningWidth = this._openingSizeResponse[`Opening_${this._openingSide}W`];
        return this._openingService.safetyCoverApd(this._safetyCoverApdRequest).then(
            data => this._safetyCoverApdResponse = data,
            error => this._toastr.error(error));
    }

    private get walkOnSafetyGrateApdResponse() {
        this._walkOnSafetyGrateApdRequest = new WalkOnSafetyGrateApdRequestModel();
        this._walkOnSafetyGrateApdRequest.AirVolumeCFM = 37335;
        this._walkOnSafetyGrateApdRequest.SafetyScreenType = EnumsAHU.Opening.E_SafetyScreenType.SafetyGrate;
        this._walkOnSafetyGrateApdRequest.OpeningShape = EnumsAHU.Opening.E_OpeningShape.Rectangle;
        this._walkOnSafetyGrateApdRequest.OpeningHeight = this._openingSizeResponse[`Opening_${this._openingSide}H`];
        this._walkOnSafetyGrateApdRequest.OpeningWidth = this._openingSizeResponse[`Opening_${this._openingSide}W`];
        return this._openingService.walkOnSafetyGrateApd(this._walkOnSafetyGrateApdRequest).then(
            data => this._walkOnSafetyGrateApdResponse = data,
            error => this._toastr.error(error));
    }
}
