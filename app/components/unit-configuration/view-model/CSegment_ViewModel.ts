import * as THREE from "three";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"

import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";
import { CDoorSelected } from "./CDoorSelected";
import { CSegmentSelected } from "./CSegmentSelected";
import { CAirPath_ViewModel } from "./CAirPath_ViewModel";

import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

import { CGlobals } from "@local/app/CGlobals";

//import { CSegmentReference } from "@jci-ahu/data.ahu.model/lib/Configuration/Types";


export class CSegment_ViewModel implements IRenderable {
    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelInterfacesAHU.Configuration.Segments.ISegment)
    {
        this._descriptorStoreAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _descriptorStoreAHU: IDescriptorStoreAHU = null;

    airPathColor: string = "";
    airflowDirection: string = "";
    openingList: ModelInterfacesAHU.Configuration.Types.IOpening[];

    // #region isSelected

    private _isSelected: boolean = false;

    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(value: boolean) {
        this._isSelected = value;

        if (this._renderer !== null) {
            if (this._isSelected) {
                // Deselect other segments 
                // Only allowing single selection for now 
                // Will eventually allow for multi-select of components 
                // to handle mass editing of common attributes, multi-deletes, etc.

                //this._unit.segmentList.forEach(
                //    i =>
                //    {
                //        if (i.model.ID.Equals(this.model.ID) === false &&
                //            i.isSelected === true) {
                //            i.isSelected = false;
                //        }

                //    });

                this.setSelectedMaterial();

            }
            else {
                this.setUnselectedMaterial();
            }
        }
    }

    // #endregion

    //#region Enable/Disable

    private _isEnabled: boolean = true;

    public get isEnabled(): boolean {
        return this._isEnabled;
    }
    public set isEnabled(value: boolean) {
        this._isEnabled = value;

        if (this._renderer !== null) {
            if (this._isEnabled) {
                this.setEnableMaterial();
            }
            else {
                this.setUnEnableMaterial();
            }
        }
    }

    //#endregion

    //#region AirFlow Enable/Disable


    private _isAirFlowEnabled: boolean = false;

    public get isAirFlowEnabled(): boolean {
        return this._isAirFlowEnabled;
    }
    public set isAirFlowEnabled(value: boolean) {
        this._isAirFlowEnabled = value;

        if (this._renderer !== null) {
            if (this._isAirFlowEnabled) {
                this.setAirFlowEnableMaterial();
            }
            else {
                this.setAirFlowUnEnableMaterial();
            }
        }
    }

    //#endregion

    //#region Openings Enable/Disable
    private _isOpeningsEnabled: boolean = true;

    public get isOpeningsEnabled(): boolean {
        return this._isOpeningsEnabled;
    }

    public set isOpeningsEnabled(value: boolean) {        
        this._isOpeningsEnabled = value;  
        
        this.render();
    }
    //#endregion

    //#region  Show doors open Enable/disable
    private _showDoorsOpenEnabled: boolean = true;
    public get showDoorsOpenEnabled(): boolean {
        return this._showDoorsOpenEnabled;
    }

    public set showDoorsOpenEnabled(value: boolean) {
        this._showDoorsOpenEnabled = value;
        this.render();
    }

    //#endregion


    // #region segmentTypeDescription

    public get segmentTypeDescription(): string {
        let type: string;
        let name: string;

        type = this._descriptorStoreAHU.Segment.SegmentType.uiDescription(this._model.segmentType);
        name = EnumsAHU.Segment.E_SegmentType[this.model.segmentType];
        if (this._model.segmentTypeSuffix > 0) {
            type = `${type} (${name}-${this._model.segmentTypeSuffix})`;
        }
        else {
            type = `${type} (${name})`;
        }

        return type;
    }

    // #endregion

    public get model(): ModelInterfacesAHU.Configuration.Segments.ISegment {
        return this._model;
    }

    // #region IRenderable Implementation

    private _renderer: IRenderer = null;

    private _exteriorMesh_Front: THREE.Mesh[] = null;
    private _exteriorMesh_Rear: THREE.Mesh[] = null;
    private _exteriorMesh_Bottom: THREE.Mesh[] = null;
    private _exteriorMesh_Top: THREE.Mesh[] = null;
    private _exteriorMesh_Left: THREE.Mesh[] = null;
    private _exteriorMesh_Right: THREE.Mesh[] = null;

    private _interiorMesh_Front: THREE.Mesh[] = null;
    private _interiorMesh_Rear: THREE.Mesh[] = null;
    private _interiorMesh_Bottom: THREE.Mesh[] = null;
    private _interiorMesh_Top: THREE.Mesh[] = null;
    private _interiorMesh_Left: THREE.Mesh[] = null;
    private _interiorMesh_Right: THREE.Mesh[] = null;

    private _edgeMesh: THREE.Mesh[] = null;

    // #region Rest Materials

    private _exteriorMaterial_Rest_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Right: THREE.MeshBasicMaterial = null;

    private _interiorMaterial_Rest_Front: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Rest_Rear: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Rest_Bottom: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Rest_Top: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Rest_Left: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Rest_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Rest: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Mouse Over Materials

    private _exteriorMaterial_Over_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Right: THREE.MeshBasicMaterial = null;

    private _interiorMaterial_Over_Front: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Over_Rear: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Over_Bottom: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Over_Top: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Over_Left: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Over_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Over: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Selected Materials

    private _exteriorMaterial_Selected_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Right: THREE.MeshBasicMaterial = null;

    private _interiorMaterial_Selected_Front: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Selected_Rear: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Selected_Bottom: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Selected_Top: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Selected_Left: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Selected_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Selected: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Enable/Disable Materials

    private _exteriorMaterial_Enable_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Right: THREE.MeshBasicMaterial = null;

    private _interiorMaterial_Enable_Front: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Enable_Rear: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Enable_Bottom: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Enable_Top: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Enable_Left: THREE.MeshBasicMaterial = null;
    private _interiorMaterial_Enable_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Enable: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region AirFlowEnable/AirFlowDisable Materials

    private _exteriorMaterial_AirFlowEnable_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_AirFlowEnable_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_AirFlowEnable_Right: THREE.MeshBasicMaterial = null;

    private _interiorMaterial_AirFlowEnable: THREE.MeshBasicMaterial = null;
    private _edgeMaterial_AirFlowEnable: THREE.MeshBasicMaterial = null;

    // #endregion

    setRenderer(renderer: IRenderer) {
        this._renderer = renderer;
    }

    //#region AirPath type Colors
    getAirPathColor(pathType) {
        switch (pathType) {
            case "ExhaustAir":
                return "#f3b629"; //YELLOW
            case "ReturnAir":
                return "#de3b21"; //RED
            case "SupplyAir":
                return "#2283dd"; //BLUE
            default:
                return "white";
        }

    }
    //#endregion

    //#region AirFlow Direction
    getAirPathDirection() {
        let direction = "";
        
        this._unit.model.airPathList.forEach((airPath) => {

            airPath.segmentReferenceList.forEach((segmentRef) => {
                
                if (segmentRef.segment.id.equals(this.model.id)) {
                    let firstSeg = airPath.segmentReferenceList[0].segment.id;
                    let lastLeg = airPath.segmentReferenceList[airPath.segmentReferenceList.length - 1].segment.id;
                    let firstLegGeometry;
                    let lastLegGeometry;
                    this._unit.model.segmentList.forEach(seg => {

                        if (seg.id.equals(firstSeg)) {
                            firstLegGeometry = seg.geometry;
                        }

                        if (seg.id.equals(lastLeg)) {
                            lastLegGeometry = seg.geometry;
                        }

                    })


                    if (firstLegGeometry['x'] > lastLegGeometry['x']) {
                        direction = "left"
                    } else {
                        direction = "right"
                    }

                    this.airPathColor = this.getAirPathColor(airPath.airPathType)
                    
                }

            })
        })
        return direction;
    }
    //#endregion

    render() {
        this.dispose();

        this.airflowDirection = this.getAirPathDirection();

        CSegmentSelected.resetSegmentMouseOver();

        let generator: PolygonGenerator.HollowModel.CMOM3DGenerator_HollowModel;
        let options: PolygonGenerator.HollowModel.C3DRenderOptions_HollowModel;
        let model: PolygonGenerator.Types.C3DModel;
        let openingList: ModelInterfacesAHU.Configuration.Types.IOpening[];

        generator = new PolygonGenerator.HollowModel.CMOM3DGenerator_HollowModel();

        options = new PolygonGenerator.HollowModel.C3DRenderOptions_HollowModel();

        options.renderFacesSeparately = true;
        options.renderBorder = true;

        options.geometry = new PolygonGenerator.Types.C3DGeometry(
            this.model.geometry.x,
            this.model.geometry.y,
            this.model.geometry.z,
            this.model.geometry.xLength,
            this.model.geometry.yLength,
            this.model.geometry.zLength);

        // #region Wall Thicknesses

        options.wallThickness_Front = this.model.wallThicknessActualValue_Front();

        options.wallThickness_Rear = this.model.wallThicknessActualValue_Rear();

        this.model.constructionOptions.surfaceDetail_Bottom.housingThickness == '_0' ?
            options.wallThickness_Bottom = 2 :
            options.wallThickness_Bottom = this.model.wallThicknessActualValue_Bottom();

        options.wallThickness_Top = this.model.wallThicknessActualValue_Top();

        options.wallThickness_Left = this.model.wallThicknessActualValue_Left();

        options.wallThickness_Right = this.model.wallThicknessActualValue_Right();

        // #endregion

        this.openingList = this.model.getOpeningList(true, false);

        //#region OpeningTypes checkbox
        //Future functionality revision pending
        let openingTypes = ['DamperFlanged', 'Standard', 'FieldCut', 'DamperFlush'];        
        //#endregion        
        this.openingList.forEach(
            i => {
                let opening: PolygonGenerator.Types.C3DOpening;

                opening = new PolygonGenerator.Types.C3DOpening();

                opening.geometry.x = i.geometry.x;
                opening.geometry.y = i.geometry.y;
                opening.geometry.z = i.geometry.z;
                opening.geometry.xlength = i.geometry.xLength;
                opening.geometry.ylength = i.geometry.yLength;
                opening.geometry.zlength = i.geometry.zLength;

                opening.face = CConverters.get3DLocation(i.unitSide);
                opening.shape = CConverters.get3DOpeningShape(i.openingShape);                                                                

                if (this.isOpeningsEnabled) {                                        
                    options.openingList.push(opening);                       
                }
                else if (!this.isOpeningsEnabled && !openingTypes.includes(i.openingType)) {
                    options.openingList.push(opening);
                }
                
            });        
        model = generator.generateModel(options);                
        // #region Exterior Meshes

        // #region Front Side

        this._exteriorMesh_Front = [];

        model.exteriorModelList_Front.forEach(
            i => {
                this._exteriorMesh_Front.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Front).length === 0) {
            // #region Generate Label Materials

           this._exteriorMaterial_Rest_Front = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);
            this._exteriorMaterial_Rest_Front.transparent = true;
            this._exteriorMaterial_Rest_Front.opacity = 0.9;

            this._exteriorMaterial_Over_Front = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Front.transparent = true;
            this._exteriorMaterial_Over_Front.opacity = 0.25;

            this._exteriorMaterial_Selected_Front = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Selected_Front.transparent = true;
            this._exteriorMaterial_Selected_Front.opacity = 0.9;

            this._exteriorMaterial_Enable_Front = PolygonGenerator.CUtility.getLabelMaterial('',
                "#969696",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Front.transparent = true;
            this._exteriorMaterial_Enable_Front.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials
            this._exteriorMaterial_Rest_Front = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Front = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Front = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Front = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Rear Side

        this._exteriorMesh_Rear = [];

        model.exteriorModelList_Rear.forEach(
            i => {
                this._exteriorMesh_Rear.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Rear).length === 0) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Rest_Rear.transparent = true;
            this._exteriorMaterial_Rest_Rear.opacity = 0.9;

            this._exteriorMaterial_Over_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Rear.transparent = true;
            this._exteriorMaterial_Over_Rear.opacity = 0.25;

            this._exteriorMaterial_Selected_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.zLength,
                this.model.geometry.yLength);
            this._exteriorMaterial_Selected_Rear.transparent = true;
            this._exteriorMaterial_Selected_Rear.opacity = 0.9;

            this._exteriorMaterial_Enable_Rear = PolygonGenerator.CUtility.getLabelMaterial('',
                "#969696",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Rear.transparent = true;
            this._exteriorMaterial_Enable_Rear.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Rear = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Rear = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Rear = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Rear = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Bottom Side

        this._exteriorMesh_Bottom = [];

        model.exteriorModelList_Bottom.forEach(
            i => {
                this._exteriorMesh_Bottom.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Bottom).length === 0) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);
            this._exteriorMaterial_Rest_Bottom.transparent = true;
            this._exteriorMaterial_Rest_Bottom.opacity = 0.9;

            this._exteriorMaterial_Over_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Over_Bottom.transparent = true;
            this._exteriorMaterial_Over_Bottom.opacity = 0.25;

            this._exteriorMaterial_Selected_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.zLength);
            this._exteriorMaterial_Selected_Bottom.transparent = true;
            this._exteriorMaterial_Selected_Bottom.opacity = 0.9;

            this._exteriorMaterial_Enable_Bottom = PolygonGenerator.CUtility.getLabelMaterial('',
                "#969696",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Bottom.transparent = true;
            this._exteriorMaterial_Enable_Bottom.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Bottom = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Bottom = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Bottom = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Bottom = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Top Side

        this._exteriorMesh_Top = [];

        model.exteriorModelList_Top.forEach(
            i => {
                this._exteriorMesh_Top.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Top).length === 0) {            
            this.createTopMeshMaterial();
        }
        else {
            // #region Generate Solid Color Materials
            

            this._exteriorMaterial_Rest_Top = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Top = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Top = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Top = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_AirFlowEnable_Top = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Left Side

        this._exteriorMesh_Left = [];

        model.exteriorModelList_Left.forEach(
            i => {
                this._exteriorMesh_Left.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Left).length === 0) {
            let dir = (this.airflowDirection === "left") ? "left" : "right";
            this.createLeftMeshMaterial();

        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Left = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Left = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Left = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Left = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_AirFlowEnable_Left = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Right Side

        this._exteriorMesh_Right = [];

        model.exteriorModelList_Right.forEach(
            i => {
                this._exteriorMesh_Right.push(i);
            });

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Right).length === 0) {
            let dir = (this.airflowDirection === "right") ? "left" : "right";
            this.createRightMeshMaterial();

        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Right = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Right = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Right = new THREE.MeshBasicMaterial({ color: "#55555F", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Enable_Right = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_AirFlowEnable_Right = new THREE.MeshBasicMaterial({ color: "#969696", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion


        // #region Edge Meshes

        this._edgeMesh = [];

        model.edgeModelList_All.forEach(
            i => {
                this._edgeMesh.push(i);
            });


        this._edgeMaterial_Rest = new THREE.MeshBasicMaterial({ color: "black" });
        this._edgeMaterial_Over = new THREE.MeshBasicMaterial({ color: "black" });
        this._edgeMaterial_Selected = new THREE.MeshBasicMaterial({ color: "black" });
        this._edgeMaterial_Enable = new THREE.MeshBasicMaterial({ color: "" });
        //this._edgeMaterial_AirFlowEnable = new THREE.MeshBasicMaterial({ color: "" });

        // #endregion

        // #region Interior Meshes

        // #region Rear Side

        this._interiorMesh_Rear = [];

        model.interiorModelList_Rear.forEach(
            i => {
                this._interiorMesh_Rear.push(i);
            });

        this._interiorMaterial_Rest_Rear = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Rear = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Rear = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Rear = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #region Front Side

        this._interiorMesh_Front = [];

        model.interiorModelList_Front.forEach(
            i => {
                this._interiorMesh_Front.push(i);
            });

        this._interiorMaterial_Rest_Front = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Front = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Front = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Front = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #region Bottom Side

        this._interiorMesh_Bottom = [];

        model.interiorModelList_Bottom.forEach(
            i => {
                this._interiorMesh_Bottom.push(i);
            });

        this._interiorMaterial_Rest_Bottom = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Bottom = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Bottom = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Bottom = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #region Top Side

        this._interiorMesh_Top = [];

        model.interiorModelList_Top.forEach(
            i => {
                this._interiorMesh_Top.push(i);
            });

        this._interiorMaterial_Rest_Top = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Top = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Top = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Top = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #region Left Side

        this._interiorMesh_Left = [];

        model.interiorModelList_Left.forEach(
            i => {
                this._interiorMesh_Left.push(i);
            });

        this._interiorMaterial_Rest_Left = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Left = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Left = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Left = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #region Right Side

        this._interiorMesh_Right = [];

        model.interiorModelList_Right.forEach(
            i => {
                this._interiorMesh_Right.push(i);
            });

        this._interiorMaterial_Rest_Right = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Over_Right = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Selected_Right = new THREE.MeshBasicMaterial({ color: "silver", transparent: true, opacity: 0.9 });
        this._interiorMaterial_Enable_Right = new THREE.MeshBasicMaterial({ color: "", transparent: true, opacity: 0.9 });

        // #endregion

        // #endregion

        this.enableEvents();



        this._exteriorMesh_Front.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Rear.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Bottom.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Top.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Left.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Right.forEach(i => this._renderer.addObject(i));

        this._interiorMesh_Front.forEach(i => this._renderer.addObject(i));
        this._interiorMesh_Rear.forEach(i => this._renderer.addObject(i));
        this._interiorMesh_Bottom.forEach(i => this._renderer.addObject(i));
        this._interiorMesh_Top.forEach(i => this._renderer.addObject(i));
        this._interiorMesh_Left.forEach(i => this._renderer.addObject(i));
        this._interiorMesh_Right.forEach(i => this._renderer.addObject(i));

        this._edgeMesh.forEach(i => this._renderer.addObject(i));

        if (this.isSelected) {
            this.setSelectedMaterial();
         //   this.setEnableMaterial();
        }
        else {
            this.setUnselectedMaterial();
        }
    }


    dispose() {                


        CSegmentSelected.segmentMouseOver = null;
        if (this.openingList != undefined) {
            this.openingList.forEach(i => {
                this._unit.openinglist.forEach(j => {
                    j.isEnabled = this.isOpeningsEnabled;
                    j.doorlist.forEach(k => { k.isEnabled = this.showDoorsOpenEnabled });
                });
            }
            )
        }
        
        if (this._exteriorMesh_Front) {
            this._exteriorMesh_Front.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Front = null;
        }

        if (this._exteriorMesh_Rear) {
            this._exteriorMesh_Rear.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Rear = null;
        }

        if (this._exteriorMesh_Bottom) {
            this._exteriorMesh_Bottom.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Bottom = null;
        }

        if (this._exteriorMesh_Top) {
            this._exteriorMesh_Top.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Top = null;
        }

        if (this._exteriorMesh_Left) {
            this._exteriorMesh_Left.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Left = null;
        }

        if (this._exteriorMesh_Right) {
            this._exteriorMesh_Right.forEach(i => this.disposeMesh(i));
            this._exteriorMesh_Right = null;
        }

        if (this._interiorMesh_Front) {
            this._interiorMesh_Front.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Front = null;
        }

        if (this._interiorMesh_Rear) {
            this._interiorMesh_Rear.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Rear = null;
        }

        if (this._interiorMesh_Bottom) {
            this._interiorMesh_Bottom.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Bottom = null;
        }

        if (this._interiorMesh_Top) {
            this._interiorMesh_Top.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Top = null;
        }

        if (this._interiorMesh_Left) {
            this._interiorMesh_Left.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Left = null;
        }

        if (this._interiorMesh_Right) {
            this._interiorMesh_Right.forEach(i => this.disposeMesh(i));
            this._interiorMesh_Right = null;
        }

        if (this._edgeMesh) {
            this._edgeMesh.forEach(i => this.disposeMesh(i));
            this._edgeMesh = null;
        }
    }

    private disposeMesh(mesh: THREE.Mesh) {
        this._renderer.removeClickEvent(mesh);
        this._renderer.removeDoubleClickEvent(mesh);
        this._renderer.removeMouseDownEvent(mesh);
        this._renderer.removeMouseUpEvent(mesh);
        this._renderer.removeMouseOverEvent(mesh);
        this._renderer.removeMouseOutEvent(mesh);
   //     this._renderer.removeMouseLeave(mesh);
        this._renderer.removeObject(mesh);
    }

    mouseout(evt: Event) {

        CSegmentSelected.segmentMouseOver = null;
     
        if (this.isSelected) {          
            return;
        }

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Rest_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Rest_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Rest_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Rest_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Rest_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Rest_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Rest); 

    }
    mouseover(evt: Event) {
        CSegmentSelected.segmentMouseOver = this.model;
          
        if (this.isSelected) return;

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Over_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Over_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Over_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Over_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Over_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Over_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Over_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Over_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Over_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Over_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Over_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Over_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Over);
   
    }

    click(evt: Event) {        
        this.isSelected = !this.isSelected;

        if (this.isSelected) CSegmentSelected.AddSegment(this.model);
        else CSegmentSelected.RemoveSegment(this.model);

        // ****
        // What is this?
        // Why are we using typescript if we're doing stuff like this?
        // let id = this.model.['_id']['_value'].toLowerCase();
        // *****
        let id = this.model.id.toString().toLowerCase();
        let el = document.getElementById("segment_" + id);
        if (el) {
            el.scrollIntoView();
        }
        let tabel = document.getElementById("tab_" + id);
        if (tabel) tabel.scrollIntoView();
        //CSegmentSelected.ShowSegments();
        //this._unit.airPathList.forEach(close => close.isOpenInTunnelNavigator = false);  
        //if (this.isSelected) {
        //    this._unit.airPathList.forEach(i => {
        //        let x = i.segmentList.findIndex(res => res.isSelected == true);
        //        if (x > -1) i.isOpenInTunnelNavigator = true;
        //    });
        //    CDoorSelected.doorSelected = null;             
        //}                
    }

    setSelectedMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Selected_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Selected_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Selected_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Selected_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Selected_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Selected_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Selected_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Selected_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Selected_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Selected_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Selected_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Selected_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Selected);
    }
    setUnselectedMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Rest_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Rest_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Rest_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Rest_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Rest_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Rest_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Rest);
    }

    // #endregion

    setUnEnableMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Enable_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Enable_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Enable_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Enable_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Enable_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Enable_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Enable_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Enable_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Enable_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Enable_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Enable_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Enable_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Enable);

        this.disableEvents()
    }


    setEnableMaterial() {

        this.createTopMeshMaterial();
        this.createLeftMeshMaterial();
        this.createRightMeshMaterial();
        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        this._interiorMesh_Front.forEach(i => i.material = this._interiorMaterial_Rest_Front);
        this._interiorMesh_Rear.forEach(i => i.material = this._interiorMaterial_Rest_Rear);
        this._interiorMesh_Bottom.forEach(i => i.material = this._interiorMaterial_Rest_Bottom);
        this._interiorMesh_Top.forEach(i => i.material = this._interiorMaterial_Rest_Top);
        this._interiorMesh_Left.forEach(i => i.material = this._interiorMaterial_Rest_Left);
        this._interiorMesh_Right.forEach(i => i.material = this._interiorMaterial_Rest_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Rest);
        this.enableEvents();

    }

    setAirFlowEnableMaterial() {

        this.createTopMeshMaterial();
        this.createLeftMeshMaterial();
        this.createRightMeshMaterial();
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        if (this.isSelected) {
            this.setSelectedMaterial();
        }
        else {
            this.setUnselectedMaterial();
        }

    }

    setAirFlowUnEnableMaterial() {

        this.createTopMeshMaterial();
        this.createLeftMeshMaterial();
        this.createRightMeshMaterial();
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_AirFlowEnable_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_AirFlowEnable_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_AirFlowEnable_Right);


        if (this.isSelected) {
            this.setSelectedMaterial();     
        }
        else {
            this.setUnselectedMaterial();
        }

    }

    enableEvents() {

        this._exteriorMesh_Front.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Front.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Front.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh_Rear.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Rear.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Rear.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh_Bottom.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Bottom.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Bottom.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh_Top.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Top.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Top.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh_Left.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Left.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Left.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh_Right.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh_Right.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh_Right.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Front.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Front.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Front.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Rear.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Rear.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Rear.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Bottom.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Bottom.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Bottom.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Top.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Top.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Top.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Left.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Left.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Left.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._interiorMesh_Right.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._interiorMesh_Right.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._interiorMesh_Right.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._edgeMesh.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));
     
    }

    disableEvents() {

        this._exteriorMesh_Front.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Front.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._exteriorMesh_Rear.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Rear.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._exteriorMesh_Bottom.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Bottom.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._exteriorMesh_Top.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Top.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._exteriorMesh_Left.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Left.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._exteriorMesh_Right.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._exteriorMesh_Right.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Front.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Front.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Rear.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Rear.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Bottom.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Bottom.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Top.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Top.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Left.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Left.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._interiorMesh_Right.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._interiorMesh_Right.forEach(i => this._renderer.removeMouseOutEvent(i));

        this._edgeMesh.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._edgeMesh.forEach(i => this._renderer.removeMouseOutEvent(i));
       
    }

    isSegmentLast(id) {
        let isLast = false;
        this._unit.model.airPathList.forEach((airPath) => {
            let lastLeg;
            
            for (let segmentRef of airPath.segmentReferenceList) {
                //console.log(segmentRef); 
                if (airPath.segmentReferenceList.length - 1 == segmentRef['_sequence']) {
                    lastLeg = segmentRef['_segmentID'];
                }
            }

            if (lastLeg) {
                if (id.equals(lastLeg)) {
                    isLast = true;
                }
            }
            else {
                isLast = true;
            }
            
        })
     
        return isLast;
      
    }

    //#region Top Side Implementation
    createTopMeshMaterial() {
        // #region Generate Label Materials

        this._exteriorMaterial_Rest_Top = PolygonGenerator.CUtility.getLabelArrowMaterial(
            (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                    this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
            "#969696",
            "white",
            this.model.geometry.xLength,
            this.model.geometry.zLength,
            this.airflowDirection, this.airPathColor,
            this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

        this._exteriorMaterial_Rest_Top.transparent = true;
        this._exteriorMaterial_Rest_Top.opacity = 0.9;

        this._exteriorMaterial_Over_Top = PolygonGenerator.CUtility.getLabelArrowMaterial(
            (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                    this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
            "#55555F",
            "black",
            this.model.geometry.xLength,
            this.model.geometry.zLength,
            this.airflowDirection, this.airPathColor,
            this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

        this._exteriorMaterial_Over_Top.transparent = true;
        this._exteriorMaterial_Over_Top.opacity = 0.25;

        this._exteriorMaterial_Selected_Top = PolygonGenerator.CUtility.getLabelArrowMaterial(
            (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                    this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
            "#55555F",
            "black",
            this.model.geometry.xLength,
            this.model.geometry.zLength,
            this.airflowDirection, this.airPathColor,
            true, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));
        this._exteriorMaterial_Selected_Top.transparent = true;
        this._exteriorMaterial_Selected_Top.opacity = 0.9;

        this._exteriorMaterial_Enable_Top = PolygonGenerator.CUtility.getLabelArrowMaterial('',
            "#969696",
            "white",
            this.model.geometry.xLength,
            this.model.geometry.zLength,
            this.airflowDirection, this.airPathColor,
            this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

        this._exteriorMaterial_Enable_Top.transparent = true;
        this._exteriorMaterial_Enable_Top.opacity = 0.9;

        this._exteriorMaterial_AirFlowEnable_Top = PolygonGenerator.CUtility.getLabelArrowMaterial(
            (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                    this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
            "#969696",
            "white",
            this.model.geometry.xLength,
            this.model.geometry.yLength,
            this.airflowDirection, this.airPathColor,
            this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

        this._exteriorMaterial_AirFlowEnable_Top.transparent = true;
        this._exteriorMaterial_AirFlowEnable_Top.opacity = 0.9;

        // #endregion
    }
    //#endregion

    //#region Light Side Implementation
    createLeftMeshMaterial() {

        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Left).length === 0) {
            let dir = (this.airflowDirection === "left") ? "left" : "right";
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Left = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Rest_Left.transparent = true;
            this._exteriorMaterial_Rest_Left.opacity = 0.9;

            this._exteriorMaterial_Over_Left = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Over_Left.transparent = true;
            this._exteriorMaterial_Over_Left.opacity = 0.25;

            this._exteriorMaterial_Selected_Left = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                true, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));
            this._exteriorMaterial_Selected_Left.transparent = true;
            this._exteriorMaterial_Selected_Left.opacity = 0.9;

            this._exteriorMaterial_Enable_Left = PolygonGenerator.CUtility.getLabelArrowMaterial('',
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Enable_Left.transparent = true;
            this._exteriorMaterial_Enable_Left.opacity = 0.9;

            this._exteriorMaterial_AirFlowEnable_Left = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                this.airflowDirection, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_AirFlowEnable_Left.transparent = true;
            this._exteriorMaterial_AirFlowEnable_Left.opacity = 0.9;
            // #endregion
        }
   
    }
    //#endregion

    //#region Right Side Implementation
    createRightMeshMaterial() {
        if (this.openingList.filter(i => i.unitSide === EnumsCommon.Common.E_UnitSide.Right).length === 0) {
            let dir = (this.airflowDirection === "right") ? "left" : "right";

            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Right = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Rest_Right.transparent = true;
            this._exteriorMaterial_Rest_Right.opacity = 0.9;


            this._exteriorMaterial_Over_Right = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Over_Right.transparent = true;
            this._exteriorMaterial_Over_Right.opacity = 0.25;

            this._exteriorMaterial_Selected_Right = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#55555F",
                "black",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                true, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));
            this._exteriorMaterial_Selected_Right.transparent = true;
            this._exteriorMaterial_Selected_Right.opacity = 0.9;

            this._exteriorMaterial_Enable_Right = PolygonGenerator.CUtility.getLabelArrowMaterial('',
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                dir, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_Enable_Right.transparent = true;
            this._exteriorMaterial_Enable_Right.opacity = 0.9;

            this._exteriorMaterial_AirFlowEnable_Right = PolygonGenerator.CUtility.getLabelArrowMaterial(
                (this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? "VB" :
                    (this.model.segmentTypeSuffix > 0 ? EnumsAHU.Segment.E_SegmentType[this.model.segmentType] + '-' +
                        this.model.segmentTypeSuffix.toString() : EnumsAHU.Segment.E_SegmentType[this.model.segmentType])),
                "#969696",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                this.airflowDirection, this.airPathColor,
                this.isEnabled, this.model.segmentType === EnumsAHU.Segment.E_SegmentType.VESTIBULE ? false : this.isAirFlowEnabled, this.isSegmentLast(this.model['_id']));

            this._exteriorMaterial_AirFlowEnable_Right.transparent = true;
            this._exteriorMaterial_AirFlowEnable_Right.opacity = 0.9;

            // #endregion

        }
    }
    //#endregion
}