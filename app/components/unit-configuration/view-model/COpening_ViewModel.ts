import * as THREE from "three";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as PolygonGenerator from "@jci-ahu/ui.shared.polygon-generator"

import { CUnit_ViewModel } from "./CUnit_ViewModel";
import { IRenderable } from "./IRenderable";
import { IRenderer } from "./IRenderer";
import { CConverters } from "../unit-viewer-3d/CConverters";
import { take } from "rxjs/operators";
import { Enums } from "@jci-ahu/ui.shared.polygon-generator";
import { CDoor_ViewModel } from "./CDoor_ViewModel";
import { CDamper_ViewModel } from "./CDamper_ViewModel";
import { CStandard_ViewModel } from "./CStandard_ViewModel";

export class COpening_ViewModel {

    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelInterfacesAHU.Configuration.Types.IOpening) {

    }

    private _isSelected: boolean = false;
    private _isEnabled: boolean = true;

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(value: boolean) {
        this._isSelected = value;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public set isEnabled(value: boolean) {
        this._isEnabled = value;        
        this.render();
    }

    private _doorlist: CDoor_ViewModel[] = null;
    private _damperlist: CDamper_ViewModel[] = null;
    private _standardlist: CStandard_ViewModel[] = null;


    public get model(): ModelInterfacesAHU.Configuration.Types.IOpening {
        return this._model;
    }


    //#region IRenderable Implementation

    private _renderer: IRenderer = null;
    private _exteriorMesh: THREE.Mesh[] = null;
    private _exteriorMaterial_Rest: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Over: THREE.MeshBasicMaterial = null;
    private _exteriorMaterial_Selected: THREE.MeshBasicMaterial = null;

    setRenderer(renderer: IRenderer) {
        this._renderer = renderer;
    }

    render() {
        this.dispose();

        this.doorlist.forEach(door => {
            door.setRenderer(this._renderer);
            door.render();
        });
        this.doorlist.forEach(door => {
            if (door.isSelected) {
                door.setSelectedMaterial();
            } else {
                door.setUnselectedMaterial();
            }
        });

        //#region RENDER OPENINGS         
        if (this.isEnabled) {

            this.damperlist.forEach(damper => {
                damper.setRenderer(this._renderer);
                damper.render();
            });

            this.damperlist.forEach(damper => {
                if (damper.isSelected) {
                    damper.setSelectedMaterial();
                } else {
                    damper.setUnselectedMaterial();
                }
            });

            //#region Render Standard Opennings

            this.standardlist.forEach(standard => {
                standard.setRenderer(this._renderer);
                standard.render();
            });

            this.standardlist.forEach(standard => {
                if (standard.isSelected) {
                    standard.setSelectedMaterial();
                } else {
                    standard.setUnselectedMaterial();
                }
            });

        //#endregion


        }
        //#endregion

        


    }

    public get doorlist(): CDoor_ViewModel[] {
        if (this._doorlist === null) {
            this._doorlist = [];
            if (this.model.openingType === 'Door') {
                this.model.doorList.forEach(
                    i => {
                        (i.isDeleted === false)
                        {

                            this.doorlist.push(new CDoor_ViewModel(this.model, i))

                        }
                    }
                )
            };
        }
        return this._doorlist;
    }

    //#region GET DAMPER LIST
    public get damperlist(): CDamper_ViewModel[] {
        if (this._damperlist === null) {
            this._damperlist = [];

            let openingTypes = ['DamperFlanged', 'DamperFlush'];            
            if (openingTypes.includes(this.model.openingType)) {                
                this.model.damperList.forEach(
                    i => {
                        (i.isDeleted === false)
                        {
                            this._damperlist.push(new CDamper_ViewModel(this, i));                                                        
                        }
                    }
                )
            };
        }
        return this._damperlist;
    }
    //#endregion

    //#region Get Standard List
    public get standardlist(): CStandard_ViewModel[] {
        if (this._standardlist === null) {
            this._standardlist = [];

            let openingTypes = ['Standard', 'FieldCut'];            
            if (openingTypes.includes(this.model.openingType))                 
            {
                this._standardlist.push(new CStandard_ViewModel(this, this.model));                
            };
        }
        return this._standardlist;
    }
    //#endregion

    dispose(): void {
        //#region Dispose Dampers
        this.damperlist.forEach(damper => {
            damper.isEnabled = this.isEnabled;            
        });
        //#endregion

        //#region standard
        this.standardlist.forEach(standard => {
            standard.isEnabled = this.isEnabled;
        });
        //#endregion

    }
    setSelectedMaterial() {


    }
    setUnselectedMaterial() {

    }


    //#endregion
}
