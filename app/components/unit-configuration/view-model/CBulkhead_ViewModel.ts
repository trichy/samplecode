import * as THREE from "three";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";

import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"
import * as ModelConstants from "./ModelConstants";

import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";


export class CBulkhead_ViewModel implements IRenderable
{
    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelInterfacesAHU.Configuration.Types.IBulkhead) 
    {

    }

    public get model(): ModelInterfacesAHU.Configuration.Types.IBulkhead
    {
        return this._model;
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

    // #region isEnable
    private _isEnabled: boolean = false;

    public get isEnabled(): boolean {
        return this._isEnabled;
    }
    public set isEnabled(value: boolean) {
        this._isEnabled = value;

        if (this._renderer !== null) {
            if (this._isEnabled) {

                this.render();
                this.setUnselectedMaterial();
            }
            else {
                this.dispose();
            }
        }
    }
   // #endregion

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

        if (this.model.segment() === null) return;

        if (this.isEnabled === false) return;

        let generator: PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel;
        let options: PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel;
        let model: PolygonGenerator.Types.C3DModel;
        let seg: ModelInterfacesAHU.Configuration.Segments.ISegment;
        seg = this.model.segment();

        generator = new PolygonGenerator.SolidModel.CMOM3DGenerator_SolidModel();

        options = new PolygonGenerator.SolidModel.C3DRenderOptions_SolidModel;
               
        options.faceLocation = CConverters.get3DLocation(EnumsCommon.Common.E_UnitSide.Bottom);
        options.geometry = new PolygonGenerator.Types.C3DGeometry(
            this.model.geometry.x,
            seg.geometry.y,
            seg.geometry.z - 0.1,
            this.model.geometry.xLength,
            seg.geometry.yLength + 0.1,
            seg.geometry.zLength + 0.2);
        
        // #region Hollow it Out 

        if (this.model.segment().handOrientation == EnumsAHU.Segment.E_SegmentHandOrientation.FrontToRear ||
            this.model.segment().handOrientation == EnumsAHU.Segment.E_SegmentHandOrientation.RearToFront)
        {
            let opening: PolygonGenerator.Types.C3DOpening;

            opening = new PolygonGenerator.Types.C3DOpening();

            opening.face = PolygonGenerator.Enums.E_Location.Front;
            opening.shape = PolygonGenerator.Enums.E_OpeningShape.Rectangle;
            opening.geometry = new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x,
                this.model.geometry.y + ModelConstants.Bulkhead.MATERIAL_THICKNESS,
                this.model.geometry.z + ModelConstants.Bulkhead.MATERIAL_THICKNESS,
                0,
                this.model.geometry.yLength - (2 * ModelConstants.Bulkhead.MATERIAL_THICKNESS),
                this.model.geometry.zLength - (2 * ModelConstants.Bulkhead.MATERIAL_THICKNESS));

            options.openingList.push(opening);        
        }

        if (this.model.segment().handOrientation == EnumsAHU.Segment.E_SegmentHandOrientation.LeftToRight ||
            this.model.segment().handOrientation == EnumsAHU.Segment.E_SegmentHandOrientation.RightToLeft)
        {
            options.geometry = new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x - 0.1,
                seg.geometry.y,
                seg.geometry.z,
                this.model.geometry.xLength + 0.2,
                seg.geometry.yLength + 0.1,
                seg.geometry.zLength);

            let opening: PolygonGenerator.Types.C3DOpening;

            opening = new PolygonGenerator.Types.C3DOpening();

            opening.face = PolygonGenerator.Enums.E_Location.Left;
            opening.shape = PolygonGenerator.Enums.E_OpeningShape.Rectangle;
            opening.geometry = new PolygonGenerator.Types.C3DGeometry(
                this.model.geometry.x + ModelConstants.Bulkhead.MATERIAL_THICKNESS,
                this.model.geometry.y + ModelConstants.Bulkhead.MATERIAL_THICKNESS,
                this.model.geometry.z,
                this.model.geometry.xLength - (2 * ModelConstants.Bulkhead.MATERIAL_THICKNESS),
                this.model.geometry.yLength - (2 * ModelConstants.Bulkhead.MATERIAL_THICKNESS),
                0);

            options.openingList.push(opening);
        }

        // #endregion

        model = generator.generateModel(options);

        // #region Exterior Meshes / Materials

        this._exteriorMesh = [];

        model.exteriorModelList_All.forEach(
            i =>
            {
                this._exteriorMesh.push(i);
            });

        this._exteriorMaterial_Rest = new THREE.MeshBasicMaterial(
            {
                color: ModelConstants.Bulkhead.MATERIAL_REST_COLOR,
                transparent: ModelConstants.Bulkhead.MATERIAL_REST_IS_TRANSPARENT,
                opacity: ModelConstants.Bulkhead.MATERIAL_REST_OPACITY
            });

        this._exteriorMaterial_Over = new THREE.MeshBasicMaterial(
            {
                color: ModelConstants.Bulkhead.MATERIAL_OVER_COLOR,
                transparent: ModelConstants.Bulkhead.MATERIAL_OVER_IS_TRANSPARENT,
                opacity: ModelConstants.Bulkhead.MATERIAL_OVER_OPACITY
            });

        this._exteriorMaterial_Selected = new THREE.MeshBasicMaterial(
            {
                color: ModelConstants.Bulkhead.MATERIAL_SELECTED_COLOR,
                transparent: ModelConstants.Bulkhead.MATERIAL_SELECTED_IS_TRANSPARENT,
                opacity: ModelConstants.Bulkhead.MATERIAL_SELECTED_OPACITY
            });

        // #endregion

        // #region Edge Meshes / Materials

        this._edgeMesh = [];

        model.edgeModelList_All.forEach(
            i =>
            {
                this._edgeMesh.push(i);
            });

        this._edgeMaterial = new THREE.MeshBasicMaterial(
            {
                color: ModelConstants.MATERIAL_EDGE_COLOR
            });

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
        if (this._exteriorMesh == null) return

        this._exteriorMesh.forEach(
            i =>
            {
                i.material = this._exteriorMaterial_Selected;
            });
    }
    setUnselectedMaterial()
    {
        if (this._exteriorMesh == null) return

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
