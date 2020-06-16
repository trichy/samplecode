import * as THREE from "three";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as DescriptorsAHU from "@jci-ahu/data.ahu.descriptors";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"

import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";
import { Enums } from "@jci-ahu/ui.shared.polygon-generator";
import { E_OpeningShape } from "ui.shared.polygon-generator/src/Enums";
import { CUnit_ViewModel } from "./CUnit_ViewModel";

import { CDescriptor } from "@jci-ahu/data.shared.descriptors/lib";
import { COpening_ViewModel } from "./COpening_ViewModel";
import { CSegmentSelected } from "./CSegmentSelected";
import { COpening_Selected } from "./COpening_Selected";
import { CDoorSelected } from "./CDoorSelected";
import { CTransformer_Selected } from "./CTransformer_Selected";
import { CSQEnclosure_Selected } from "./CSQEnclosure_Selected";
import { CMotorControl_Selected } from "./CMotorControl_Selected";
import { CFPCControllerEnclosure_Selected } from "./CFPCControllerEnclosure_Selected";

export class CStandard_ViewModel implements IRenderable {

    constructor(
        private _opening: COpening_ViewModel,
        private _model: ModelInterfacesAHU.Configuration.Types.IOpening) {
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

    //#region isEnabled
    private _isEnabled: boolean = true;
    public get isEnabled(): boolean {
        return this._isEnabled;
    }
    public set isEnabled(value: boolean) {
        this._isEnabled = value;
        if (!this._isEnabled) this.dispose();
    }
    //#endregion

    public get model(): ModelInterfacesAHU.Configuration.Types.IOpening {
        return this._model;
    }

    //#region get3DGeometry

    public get3DGeometry(): PolygonGenerator.Types.C3DGeometry {
        let thickness: number;        
        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Front) {            
            if (this.model.segment() && this.model.segment() !== null) {
                thickness = this.model.segment().wallThicknessActualValue_Front();
            }
            else {
                thickness = 1;
            }            

            return new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x,
                this.model.geometry.y,
                this.model.geometry.z,
                thickness,
                this.model.geometry.yLength,
                this.model.geometry.zLength);
        }

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Rear) {            
            if (this.model.segment() && this.model.segment() !== null) {
                thickness = this.model.segment().wallThicknessActualValue_Rear();
            }
            else {
                thickness = 1;
            }            

            return new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x - thickness,
                this.model.geometry.y,
                this.model.geometry.z,
                thickness,
                this.model.geometry.yLength,
                this.model.geometry.zLength);
        }

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Left) {

            if (this.model.segment() && this.model.segment() !== null) {
                thickness = this.model.segment().wallThicknessActualValue_Left();
            }
            else {
                thickness = 1;
            }

            return new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x,
                this.model.geometry.y,
                this.model.geometry.z,
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                thickness);
        }

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Right) {

            if (this.model.segment() && this.model.segment() !== null) {
                thickness = this.model.segment().wallThicknessActualValue_Right();
            }
            else {
                thickness = 1;
            }

            return new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x,
                this.model.geometry.y,
                this.model.geometry.z - thickness,
                this.model.geometry.xLength,
                this.model.geometry.yLength,
                thickness);
        }

        if (this.model.unitSide === EnumsCommon.Common.E_UnitSide.Top) {
            if (this.model.segment() && this.model.segment() !== null) {
                thickness = this.model.segment().wallThicknessActualValue_Top();
            }
            else {
                thickness = 1;
            }

            return new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x,
                this.model.geometry.y,
                this.model.geometry.z,
                this.model.geometry.xLength,
                thickness,
                this.model.geometry.zLength);
        }


        return null;
    }

    //#endregion

    //#region IRenderable Implementation

    private _renderer: IRenderer = null;

    private _exteriorMesh: THREE.Mesh[] = null;
    private _edgeMesh: THREE.Mesh[] = null;

    private _exteriorMaterial_Rest: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected: THREE.MeshBasicMaterial = null;

    private _edgeMaterial: THREE.MeshBasicMaterial = null;

    setRenderer(renderer: IRenderer) {
        this._renderer = renderer;
    }

    render() {
        this.dispose();
        let generator: PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel;
        let options: PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel;
        let model: PolygonGenerator.Types.C3DModel;

        generator = new PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel();
        options = new PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel();


        //options.faceLocation = CConverters.get3DLocation(this.model.Opening.UnitSide);// Location of the damper
        //options.openingList = CConverters.get3DOpeningShape(this.model.Opening.OpeningShape);        
        options.geometry = this.get3DGeometry();
        model = generator.generateModel(options);


        //#region Exterior Meshes /Materials

        this._exteriorMesh = [];

        if (model && model !== null) {
            model.exteriorModelList_All.forEach(
                i => {
                    this._exteriorMesh.push(i);
                });
        }

        this._exteriorMaterial_Rest = new THREE.MeshBasicMaterial({ color: "#063e82", transparent: true, opacity: .1 });
        this._exteriorMaterial_Over = new THREE.MeshBasicMaterial({ color: "#63bf38", transparent: true, opacity: .10 });
        this._exteriorMaterial_Selected = new THREE.MeshBasicMaterial({ color: "#63bf38" });

        // #endregion

        // #region Edge Meshes / Materials

        this._edgeMesh = [];

        if (model && model !== null) {
            model.edgeModelList_All.forEach(
                i => {
                    this._edgeMesh.push(i);
                });
        }


        this._edgeMaterial = new THREE.MeshBasicMaterial({ color: "black" });

        //#endregion

        this._exteriorMesh.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._edgeMesh.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh.forEach(i => this._renderer.addObject(i));
        this._edgeMesh.forEach(i => this._renderer.addObject(i));

    }

    dispose() {
        if (this._exteriorMesh) {
            this._exteriorMesh.forEach(i => this.disposeMesh(i));
            this._edgeMesh.forEach(i => this.disposeMesh(i));
        }
    }

    setSelectedMaterial() {
        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Selected;
            });
    }

    setUnselectedMaterial() {
        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Rest;
            });
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

    click(evt) {
        this.isSelected = !this.isSelected;

        if (this.isSelected) {
            COpening_Selected.addToOpeningList(this._model, this._opening);
            COpening_Selected.setSelectedOpening(this.model.id, true);
            CSegmentSelected.AddSegment(this.model.segment());

            CDoorSelected.clearAllSelectedRender();
            CTransformer_Selected.clearAllSelectedRender();
            CSQEnclosure_Selected.clearAllSelectedRender();
            CMotorControl_Selected.clearAllSelectedRender();
            CFPCControllerEnclosure_Selected.clearAllSelectedRender();
        }
        else {
            COpening_Selected.setSelectedOpening(this.model.id, false);
            CSegmentSelected.RemoveSegment(this.model.segment());
        }
    }
    mouseover(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Over;
            });
    }
    mouseout(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Rest;
            });
    }

    //#endregion

}