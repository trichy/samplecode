import * as THREE from "three";

import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"

import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";

export class CUnitBase_ViewModel implements IRenderable
{
    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IUnitBase)
    {

    }

    // #region isSelected

    private _isSelected: boolean = false;

    public get isSelected(): boolean
    {
        return this._isSelected;
    }
    public set isSelected(value: boolean)
    {
        this._isSelected = value;

        if (this._renderer !== null)
        {
            if (this._isSelected)
            {
                this.setSelectedMaterial();
            }
            else
            {
                this.setUnselectedMaterial();
            }
        }
    }

    // #endregion

    public get model(): ModelAHU.Configuration.Types.IUnitBase
    {
        return this._model;
    }

    // #region IRenderable Implementation

    private _renderer: IRenderer = null;

    private _exteriorMesh: THREE.Mesh[] = null;
    private _edgeMesh: THREE.Mesh[] = null;

    private _exteriorMaterial_Rest: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected: THREE.MeshBasicMaterial = null;

    private _edgeMaterial: THREE.MeshBasicMaterial = null;

    setRenderer(renderer: IRenderer)
    {
        this._renderer = renderer;
    }
    render()
    {
        this.dispose();

        let generator: PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel;
        let options: PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel;
        let model: PolygonGenerator.Types.C3DModel;

        generator = new PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel();

        options = new PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel;

        options.faceLocation = CConverters.get3DLocation(EnumsCommon.Common.E_UnitSide.Bottom);
        options.geometry = new PolygonGenerator.Types.C3DGeometry(
            this.model.geometry.x,
            this.model.geometry.y,
            this.model.geometry.z,
            this.model.geometry.xLength,
            this.model.geometry.yLength,
            this.model.geometry.zLength);
              
        model = generator.generateModel(options);

        // #region Exterior Meshes / Materials

        this._exteriorMesh = [];

        model.exteriorModelList_All.forEach(
            i =>
            {
                this._exteriorMesh.push(i);
            });

        this._exteriorMaterial_Rest = new THREE.MeshBasicMaterial({ color: "#cccccc", transparent: true, opacity: .9 });
        this._exteriorMaterial_Over = new THREE.MeshBasicMaterial({ color: "#f3b629", transparent: true, opacity: .25 });
        this._exteriorMaterial_Selected = new THREE.MeshBasicMaterial({ color: "#f3b629" });

        // #endregion

        // #region Edge Meshes / Materials

        this._edgeMesh = [];

        model.edgeModelList_All.forEach(
            i =>
            {
                this._edgeMesh.push(i);
            });

        this._edgeMaterial = new THREE.MeshBasicMaterial({ color: "black" });

        // #endregion

        this._exteriorMesh.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._exteriorMesh.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._exteriorMesh.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._edgeMesh.forEach(i => this._renderer.addClickEvent(i, (evt) => this.click(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOverEvent(i, (evt) => this.mouseover(evt)));
        this._edgeMesh.forEach(i => this._renderer.addMouseOutEvent(i, (evt) => this.mouseout(evt)));

        this._exteriorMesh.forEach(i => this._renderer.addObject(i));
        this._edgeMesh.forEach(i => this._renderer.addObject(i));
    }
    dispose()
    {
        if (this._exteriorMesh)
        {
            this._exteriorMesh.forEach(i => this.disposeMesh(i));
            this._edgeMesh.forEach(i => this.disposeMesh(i));
        }
    }
    setSelectedMaterial()
    {
        this._exteriorMesh.forEach(
            i =>
            {
                i.material = this._exteriorMaterial_Selected;
            });
    }
    setUnselectedMaterial()
    {
        this._exteriorMesh.forEach(
            i =>
            {
                i.material = this._exteriorMaterial_Rest;
            });
    }

    private disposeMesh(mesh: THREE.Mesh)
    {
        this._renderer.removeClickEvent(mesh);
        this._renderer.removeDoubleClickEvent(mesh);
        this._renderer.removeMouseDownEvent(mesh);
        this._renderer.removeMouseUpEvent(mesh);
        this._renderer.removeMouseOverEvent(mesh);
        this._renderer.removeMouseOutEvent(mesh);

        this._renderer.removeObject(mesh);
    }

    click(evt: Event)
    {
        this.isSelected = !this.isSelected;
    }
    mouseover(evt: Event)
    {
        this._exteriorMesh.forEach(
            i =>
            {
                i.material = this._exteriorMaterial_Over;
            });
    }
    mouseout(evt: Event)
    {
        this._exteriorMesh.forEach(
            i =>
            {
                i.material = this._exteriorMaterial_Rest;
            });
    }
    
    // #endregion
}