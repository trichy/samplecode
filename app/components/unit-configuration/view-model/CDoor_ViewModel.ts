import * as THREE from "three";

import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"
import * as CommonServices from "@local/app/shared/services/services.module";

import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";
import { Enums } from "@jci-ahu/ui.shared.polygon-generator";
import { E_OpeningShape } from "ui.shared.polygon-generator/src/Enums";
import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { COpening_ViewModel } from "./COpening_ViewModel";
import { CDoorSelected } from "./CDoorSelected";
import { CSegmentSelected } from "./CSegmentSelected";
import { COpening_Selected } from "./COpening_Selected";
import { CTransformer_Selected } from "./CTransformer_Selected";
import { CSQEnclosure_Selected } from "./CSQEnclosure_Selected";
import { CMotorControl_Selected } from "./CMotorControl_Selected";
import { CFPCControllerEnclosure_Selected } from "./CFPCControllerEnclosure_Selected";
import { E_DoorSwingDirection } from "@jci-ahu/data.ahu.enums/lib/Door";
import { E_UnitSide } from "@jci-ahu/data.common.enums/lib/Common";

export class CDoor_ViewModel implements IRenderable {

    constructor(
        private _unit: ModelAHU.Configuration.Types.IOpening,
        private _model: ModelAHU.Configuration.Types.IDoor) {
    }


    // #region isSelected

    private _isSelected: boolean = false;
    private _isEnabled: boolean = true;

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

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public set isEnabled(value: boolean) {
        this._isEnabled = value;
        this.render();
    }

    // #endregion

    private _selectedModel: ModelAHU.Configuration.Types.IDoor = null;

    public set selectedModel(value: ModelAHU.Configuration.Types.IDoor) {
        this._selectedModel = value;
    }

    public get selectedModel(): ModelAHU.Configuration.Types.IDoor {
        return this._selectedModel;
    }

    public get model(): ModelAHU.Configuration.Types.IDoor {
        return this._model;
    }

    //#region get3DGeometry

    public get3DGeometry(): PolygonGenerator.Types.C3DGeometry {
        let thickness: number;

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Front) {

            if (this.model.opening.segment() && this.model.opening.segment() !== null) 
            {
                thickness = this.model.opening.segment().wallThicknessActualValue_Front();
            }
            else 
            {
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

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Rear) {

            if (this.model.opening.segment() && this.model.opening.segment() !== null)
            {
                thickness = this.model.opening.segment().wallThicknessActualValue_Rear();
            }
            else
            {
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

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Left) {

            if (this.model.opening.segment() && this.model.opening.segment() !== null) 
            {
                thickness = this.model.opening.segment().wallThicknessActualValue_Left();
            }
            else
            {
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

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Right) {

            if (this.model.opening.segment() && this.model.opening.segment() !== null) 
            {
                thickness = this.model.opening.segment().wallThicknessActualValue_Right();
            }
            else
            {
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


        //options.faceLocation = CConverters.get3DLocation(this.model.Opening.UnitSide);// Location of the door
        //options.openingList = CConverters.get3DOpeningShape(this.model.Opening.OpeningShape);


        options.geometry = this.get3DGeometry();

        //#region viewport

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Front ||
            this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Rear)
        {
            if (this.model.viewportType && this.model.viewportType !== 'None') {
                let Height, Width;

                let dimensions = this.model.viewportType.split(/_/)[1].split('x');

                Height = parseInt(dimensions[1]);
                Width = parseInt(dimensions[0]);
                let opening: PolygonGenerator.Types.C3DOpening;

                opening = new PolygonGenerator.Types.C3DOpening();

                opening.geometry.x = this._unit.geometry.x;

                opening.geometry.z = this._unit.geometry.z +
                    (this._unit.geometry.zLength / 2) - ((Width) / 2);

                opening.geometry.y = this._unit.geometry.y +
                    (this._unit.geometry.yLength / 2) - ((Height) / 2);

                opening.geometry.xlength = this._unit.geometry.xLength;
                opening.geometry.zlength = Width;
                opening.geometry.ylength = Height;

                opening.face = CConverters.get3DLocation(this._unit.unitSide);
                opening.shape = CConverters.get3DOpeningShape(this._unit.openingShape);

                options.openingList.push(opening);

            }

        }

        if (this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Left ||
            this.model.opening.unitSide === EnumsCommon.Common.E_UnitSide.Right)
        {

            if (this.model.viewportType && this.model.viewportType !== 'None') {
                let Height, Width;

                let dimensions = this.model.viewportType.split(/_/)[1].split('x');

                Height = parseInt(dimensions[1]);
                Width = parseInt(dimensions[0]);
                let opening: PolygonGenerator.Types.C3DOpening;

                opening = new PolygonGenerator.Types.C3DOpening();

                opening.geometry.x = this._unit.geometry.x +
                    (this._unit.geometry.xLength / 2) - ((Width) / 2);

                //Width
                opening.geometry.z = this._unit.geometry.z;


                //Height
                opening.geometry.y = this._unit.geometry.y +
                    (this._unit.geometry.yLength / 2) - ((Height) / 2);

                opening.geometry.xlength = Width;
                opening.geometry.zlength = this._unit.geometry.zLength;;
                opening.geometry.ylength = Height;

                opening.face = CConverters.get3DLocation(this._unit.unitSide);
                opening.shape = CConverters.get3DOpeningShape(this._unit.openingShape);

                options.openingList.push(opening);

            }
        }

        //#endregion viewport

        model = generator.generateModel(options);
        
        
        //#region Exterior Meshes /Materials

        this._exteriorMesh = [];

        if (model && model !== null) {
            model.exteriorModelList_All.forEach(
                i => {
                    this._exteriorMesh.push(i);
                });
        }

        this._exteriorMaterial_Rest = new THREE.MeshBasicMaterial({ color: "#1375cf", transparent: true, opacity: .9 });
        this._exteriorMaterial_Over = new THREE.MeshBasicMaterial({ color: "#1375cf", transparent: true, opacity: .25 });
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

        if (this._isEnabled) {
            this.setDoorOpen();
        }

        if (this.isSelected) {
            this.setSelectedMaterial();
        }
        else {
            this.setUnselectedMaterial();
        }
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
            CDoorSelected.addToDoorList(this.model, this);
            CDoorSelected.setSelectedDoor(this.model.id, true);
            CSegmentSelected.AddSegment(this.model.opening.segment());

            COpening_Selected.clearAllSelectedRender();
            CTransformer_Selected.clearAllSelectedRender();
            CSQEnclosure_Selected.clearAllSelectedRender();
            CMotorControl_Selected.clearAllSelectedRender();
            CFPCControllerEnclosure_Selected.clearAllSelectedRender();
        }
        else {
            CDoorSelected.setSelectedDoor(this.model.id, false);
            CSegmentSelected.RemoveSegment(this.model.opening.segment());
        }
        this.render();
    }
    mouseover(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Over;
            });

        this.render();
    }
    mouseout(evt: Event) {
        if (this.isSelected) return;

        this._exteriorMesh.forEach(
            i => {
                i.material = this._exteriorMaterial_Rest;
            });

        this.render();
    }

    //#endregion


    setDoorOpen() {
        let radian = CommonServices.degreeToRadian(45);
        let x = this._model.geometry.x;
        let y = this._model.geometry.y;
        let z = this._model.geometry.z;
        let hingeLocation: THREE.Vector3 = new THREE.Vector3(x, y, z);

        switch (this._model.opening.unitSide) {
            case E_UnitSide.Left:
                if (this._model.hingeLocation === E_UnitSide.Front) {
                    if (this._model.swingDirection === E_DoorSwingDirection.Inward) {
                        radian = 0 - radian;
                    }
                } else if (this._model.hingeLocation === E_UnitSide.Rear) {
                    hingeLocation.x += this._model.geometry.xLength;
                    if (this._model.swingDirection === E_DoorSwingDirection.Outward) {
                        radian = 0 - radian;
                    }
                }
                break;
            case E_UnitSide.Right:
                if (this._model.hingeLocation === E_UnitSide.Front) {
                    if (this._model.swingDirection === E_DoorSwingDirection.Outward) {
                        radian = 0 - radian;
                    }
                } else if (this._model.hingeLocation === E_UnitSide.Rear) {
                    hingeLocation.x += this._model.geometry.xLength;
                    if (this._model.swingDirection === E_DoorSwingDirection.Inward) {
                        radian = 0 - radian;
                    }
                }
                break;
            case E_UnitSide.Front:
                if (this._model.hingeLocation === E_UnitSide.Left) {
                    if (this._model.swingDirection === E_DoorSwingDirection.Outward) {
                        radian = 0 - radian;
                    }
                } else if (this._model.hingeLocation === E_UnitSide.Right) {
                    hingeLocation.z += this._model.geometry.zLength;
                    if (this._model.swingDirection === E_DoorSwingDirection.Inward) {
                        radian = 0 - radian;
                    }
                }
                break;
            case E_UnitSide.Rear:
                if (this._model.hingeLocation === E_UnitSide.Left) {
                    if (this._model.swingDirection === E_DoorSwingDirection.Inward) {
                        radian = 0 - radian;
                    }
                } else if (this._model.hingeLocation === E_UnitSide.Right) {
                    hingeLocation.z += this._model.geometry.zLength;
                    if (this._model.swingDirection === E_DoorSwingDirection.Outward) {
                        radian = 0 - radian;
                    }
                }
                break;
        }

        this._exteriorMesh.forEach(i => {
            i.geometry.translate(0 - hingeLocation.x, 0 - hingeLocation.y, 0 - hingeLocation.z);
            i.geometry.rotateY(radian);
            i.geometry.translate(hingeLocation.x, hingeLocation.y, hingeLocation.z);
        });

        this._edgeMesh.forEach(i => {
            i.geometry.translate(0 - hingeLocation.x, 0 - hingeLocation.y, 0 - hingeLocation.z);
            i.geometry.rotateY(radian);
            i.geometry.translate(hingeLocation.x, hingeLocation.y, hingeLocation.z);
        });
    }

}