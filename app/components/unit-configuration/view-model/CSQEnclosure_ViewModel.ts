import * as THREE from "three";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"

import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";

import { COpening_Selected } from "./COpening_Selected";
import { CDoorSelected } from "./CDoorSelected";
import { CTransformer_Selected } from "./CTransformer_Selected";
import { CSQEnclosure_Selected } from "./CSQEnclosure_Selected";
import { CMotorControl_Selected } from "./CMotorControl_Selected";
import { CFPCControllerEnclosure_Selected } from "./CFPCControllerEnclosure_Selected";


export class CSQEnclosure_ViewModel implements IRenderable {
    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelInterfacesAHU.Configuration.Types.ISQEnclosure) {
    }

    // #region isSelected

    private _isSelected: boolean = false;

    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(value: boolean) {
        this._isSelected = value;

        if (this._renderer !== null) {
            if (this._isSelected) {
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

    public get model(): ModelInterfacesAHU.Configuration.Types.ISQEnclosure {
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

    private _edgeMesh: THREE.Mesh[] = null;

    // #region Rest Materials

    private _exteriorMaterial_Rest_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Rest_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Rest: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Mouse Over Materials

    private _exteriorMaterial_Over_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Over: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Selected Materials

    private _exteriorMaterial_Selected_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Selected: THREE.MeshBasicMaterial = null;

    // #endregion

    // #region Enable/Disable Materials

    private _exteriorMaterial_Enable_Front: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Rear: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Bottom: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Top: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Left: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Enable_Right: THREE.MeshBasicMaterial = null;

    private _edgeMaterial_Enable: THREE.MeshBasicMaterial = null;

    // #endregion

    setRenderer(renderer: IRenderer) {
        this._renderer = renderer;
    }

    render() {
        this.dispose();

        let generator: PolygonGenerator.HollowModel.CMOM3DGenerator_HollowModel;
        let options: PolygonGenerator.HollowModel.C3DRenderOptions_HollowModel;
        let model: PolygonGenerator.Types.C3DModel;

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

        options.wallThickness_Front = 1;
        options.wallThickness_Rear = 1;
        options.wallThickness_Bottom = 1;
        options.wallThickness_Top = 1;
        options.wallThickness_Left = 1;
        options.wallThickness_Right = 1;

        // #endregion

        model = generator.generateModel(options);

        // #region Exterior Meshes

        // #region Front Side

        this._exteriorMesh_Front = [];

        model.exteriorModelList_Front.forEach(
            i => {
                this._exteriorMesh_Front.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Front) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Front = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);
            this._exteriorMaterial_Rest_Front.transparent = true;
            this._exteriorMaterial_Rest_Front.opacity = 0.9;

            this._exteriorMaterial_Over_Front = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Front.transparent = true;
            this._exteriorMaterial_Over_Front.opacity = 0.25;

            this._exteriorMaterial_Selected_Front = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Front = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Front.transparent = true;
            this._exteriorMaterial_Enable_Front.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Front = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Front = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Front = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Front = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Rear Side

        this._exteriorMesh_Rear = [];

        model.exteriorModelList_Rear.forEach(
            i => {
                this._exteriorMesh_Rear.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Rear) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Rest_Rear.transparent = true;
            this._exteriorMaterial_Rest_Rear.opacity = 0.9;

            this._exteriorMaterial_Over_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Rear.transparent = true;
            this._exteriorMaterial_Over_Rear.opacity = 0.25;

            this._exteriorMaterial_Selected_Rear = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Rear = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Rear.transparent = true;
            this._exteriorMaterial_Enable_Rear.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Rear = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Rear = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Rear = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Rear = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Bottom Side

        this._exteriorMesh_Bottom = [];

        model.exteriorModelList_Bottom.forEach(
            i => {
                this._exteriorMesh_Bottom.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Bottom) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);
            this._exteriorMaterial_Rest_Bottom.transparent = true;
            this._exteriorMaterial_Rest_Bottom.opacity = 0.9;

            this._exteriorMaterial_Over_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Over_Bottom.transparent = true;
            this._exteriorMaterial_Over_Bottom.opacity = 0.25;

            this._exteriorMaterial_Selected_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Enable_Bottom = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Enable_Bottom.transparent = true;
            this._exteriorMaterial_Enable_Bottom.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Bottom = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Bottom = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Bottom = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Bottom = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Top Side

        this._exteriorMesh_Top = [];

        model.exteriorModelList_Top.forEach(
            i => {
                this._exteriorMesh_Top.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Top) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Top = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);
            this._exteriorMaterial_Rest_Top.transparent = true;
            this._exteriorMaterial_Rest_Top.opacity = 0.9;

            this._exteriorMaterial_Over_Top = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Over_Top.transparent = true;
            this._exteriorMaterial_Over_Top.opacity = 0.25;

            this._exteriorMaterial_Selected_Bottom = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Enable_Top = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.zLength);

            this._exteriorMaterial_Enable_Top.transparent = true;
            this._exteriorMaterial_Enable_Top.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Top = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Top = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Top = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Top = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Left Side

        this._exteriorMesh_Left = [];

        model.exteriorModelList_Left.forEach(
            i => {
                this._exteriorMesh_Left.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Left) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Left = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);
            this._exteriorMaterial_Rest_Left.transparent = true;
            this._exteriorMaterial_Rest_Left.opacity = 0.9;

            this._exteriorMaterial_Over_Left = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Left.transparent = true;
            this._exteriorMaterial_Over_Left.opacity = 0.25;

            this._exteriorMaterial_Selected_Left = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Left = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.zLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Left.transparent = true;
            this._exteriorMaterial_Enable_Left.opacity = 0.9;

            // #endregion

        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Left = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Left = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Left = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Left = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

            // #endregion
        }

        // #endregion

        // #region Right Side

        this._exteriorMesh_Right = [];

        model.exteriorModelList_Right.forEach(
            i => {
                this._exteriorMesh_Right.push(i);
            });

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Right) {
            // #region Generate Label Materials

            this._exteriorMaterial_Rest_Right = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);
            this._exteriorMaterial_Rest_Right.transparent = true;
            this._exteriorMaterial_Rest_Right.opacity = 0.9;

            this._exteriorMaterial_Over_Right = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Over_Right.transparent = true;
            this._exteriorMaterial_Over_Right.opacity = 0.25;

            this._exteriorMaterial_Selected_Right = PolygonGenerator.CUtility.getLabelMaterial(
                this.model.userDefinedName ? this.model.userDefinedName : "SQ",
                "#f3b629",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Right = PolygonGenerator.CUtility.getLabelMaterial('',
                "#fa9225",
                "white",
                this.model.geometry.xLength,
                this.model.geometry.yLength);

            this._exteriorMaterial_Enable_Right.transparent = true;
            this._exteriorMaterial_Enable_Right.opacity = 0.9;

            // #endregion
        }
        else {
            // #region Generate Solid Color Materials

            this._exteriorMaterial_Rest_Right = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });
            this._exteriorMaterial_Over_Right = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: 0.25 });
            this._exteriorMaterial_Selected_Right = new THREE.MeshBasicMaterial({ color: "#f3b629" });
            this._exteriorMaterial_Enable_Right = new THREE.MeshBasicMaterial({ color: "#fa9225", transparent: true, opacity: 0.9 });

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

        // #endregion

        this.enableEvents();

        this._exteriorMesh_Front.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Rear.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Bottom.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Top.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Left.forEach(i => this._renderer.addObject(i));
        this._exteriorMesh_Right.forEach(i => this._renderer.addObject(i));

        this._edgeMesh.forEach(i => this._renderer.addObject(i));

        if (this.isSelected) {
            this.setSelectedMaterial();
        }
        else {
            this.setUnselectedMaterial();
        }
    }


    dispose() {
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

        this._renderer.removeObject(mesh);
    }

    mouseout(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Rest);
    }
    mouseover(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Over_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Over_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Over_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Over_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Over_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Over_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Over);
    }
    click(evt: Event) {
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
            CSQEnclosure_Selected.addToList(this.model, this);
            CSQEnclosure_Selected.setselectedItem(this.model.id, this.isSelected);

            COpening_Selected.clearAllSelectedRender();
            CDoorSelected.clearAllSelectedRender();
            CTransformer_Selected.clearAllSelectedRender();
            CMotorControl_Selected.clearAllSelectedRender();
            CFPCControllerEnclosure_Selected.clearAllSelectedRender();
        }
        else {
            CSQEnclosure_Selected.setselectedItem(this.model.id, this.isSelected);
        }
    }

    setSelectedMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Selected_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Selected_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Selected_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Selected_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Selected_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Selected_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Selected);
    }
    setUnselectedMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

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

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Enable);

        this.disableEvents()
    }


    setEnableMaterial() {

        this._exteriorMesh_Front.forEach(i => i.material = this._exteriorMaterial_Rest_Front);
        this._exteriorMesh_Rear.forEach(i => i.material = this._exteriorMaterial_Rest_Rear);
        this._exteriorMesh_Bottom.forEach(i => i.material = this._exteriorMaterial_Rest_Bottom);
        this._exteriorMesh_Top.forEach(i => i.material = this._exteriorMaterial_Rest_Top);
        this._exteriorMesh_Left.forEach(i => i.material = this._exteriorMaterial_Rest_Left);
        this._exteriorMesh_Right.forEach(i => i.material = this._exteriorMaterial_Rest_Right);

        this._edgeMesh.forEach(i => i.material = this._edgeMaterial_Rest);
        this.enableEvents();

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

        this._edgeMesh.forEach(i => this._renderer.removeMouseOverEvent(i));
        this._edgeMesh.forEach(i => this._renderer.removeMouseOutEvent(i));
    }

}