import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { Inject } from "@angular/core";

import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces"; 

import { IModelFactoryAHU } from "@jci-ahu/data.ahu.model-factory.interfaces";
import { TOKEN_IModelFactoryAHU } from "@jci-ahu/data.ahu.model-factory.interfaces";

import { COpeningProperty_ViewModel } from "../view-model/COpeningProperty_ViewModel";
import { CDoorProperty_ViewModel } from "../view-model/CDoorProperty_ViewModel";
import { WorkingDataService } from "@local/app/services/working-data.service";
import { CTransformerPropetry_ViewModel } from "@local/app/components/unit-configuration/view-model/CTransformerProperty_ViewModel";
import { CSQEnclosurePropetry_ViewModel } from "@local/app/components/unit-configuration/view-model/CSQEnclosureProperty_ViewModel";
import { CMotorControlProperty_ViewModel } from "@local/app/components/unit-configuration/view-model/CMotorControlProperty_ViewModel";
import { CFPCControllerEnclosureProperty_ViewModel } from "@local/app/components/unit-configuration/view-model/CFPCControllerEnclosureProperty_ViewModel";


@Component
    ({
        selector: "properties-selector",
        templateUrl: "./properties-selector.component.html",
        styleUrls:
            [
                "./properties-selector.component.css"
            ]
    })
export class PropertiesSelectorComponent implements OnInit {

    @ViewChild("propgrid")
    public _propGrid: PG.PropertyGridComponent;
    
    @Input("segment")
    public segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    private _doorLoad: boolean = false;
    private _doorBack: ModelInterfacesAHU.Configuration.Types.IDoor = null;
    private _openingBack: ModelInterfacesAHU.Configuration.Types.IOpening = null;
    private _transformerBack: ModelInterfacesAHU.Configuration.Types.ITransformer = null;
    private _sqEnclosureBack: ModelInterfacesAHU.Configuration.Types.ISQEnclosure = null;
    private _motorControlBack: ModelInterfacesAHU.Configuration.Types.IMotorControl = null;
    private _fPCControllerEnclosureBack: ModelInterfacesAHU.Configuration.Types.IFPCControllerEnclosure = null;


    constructor(
        @Inject(TOKEN_IModelFactoryAHU) private _modelFactory: IModelFactoryAHU,
        private _workingService: WorkingDataService)
    {
    }

    private lastSelect: number = 0;

    ngOnInit(): void 
    {
        this._doorBack = this._modelFactory.Configuration.Types.Door.create(
            this._workingService.WorkingUnit.model);
        this._openingBack = this._modelFactory.Configuration.Types.Opening.create(
            this._workingService.WorkingUnit.model);
        this._transformerBack = this._modelFactory.Configuration.Types.Transformer.create(
            this._workingService.WorkingUnit.model);
        this._sqEnclosureBack = this._modelFactory.Configuration.Types.SQEnclosure.create(
            this._workingService.WorkingUnit.model);
        this._motorControlBack = this._modelFactory.Configuration.Types.MotorControl.create(
            this._workingService.WorkingUnit.model);
        this._fPCControllerEnclosureBack = this._modelFactory.Configuration.Types.FPCControllerEnclosure.create(
            this._workingService.WorkingUnit.model);
    }

    ngDoCheck() {
        this.loadProperties();
    }

    private loadProperties(): void {
        let doorObj = this._workingService.WorkingUnit.getDoorSelected;
        let openingObj = this._workingService.WorkingUnit.getOpeningSelected;
        let transformerObj = this._workingService.WorkingUnit.getTransformerSelected;
        let sqEnclosureObj = this._workingService.WorkingUnit.getSQEnclosureSelected;
        let motorControlObj = this._workingService.WorkingUnit.getMotorControlSelected;
        let fpcControlObj = this._workingService.WorkingUnit.getFPCControlEnclosureSelected;

        if (doorObj !== null) {
            let isDiff: boolean = (this._doorBack.id.equals(doorObj.id) === false);
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 1)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: CDoorProperty_ViewModel = new CDoorProperty_ViewModel(unitView, doorObj);
                this._propGrid.LoadObject(obj);

                this._doorBack = doorObj;
                this.lastSelect = 1;
                return;
            }
        }


        if (openingObj !== null) {
            let isDiff: boolean = (this._openingBack.id.equals(openingObj.id) === false);
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 2)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: COpeningProperty_ViewModel = new COpeningProperty_ViewModel(unitView, openingObj);
                this._propGrid.LoadObject(obj);

                this._openingBack = openingObj;
                this.lastSelect = 2;
                return;
            }
        }

        if (transformerObj !== null) {
            let isDiff: boolean = this._transformerBack.id.equals(transformerObj.id) === false;
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 3)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: CTransformerPropetry_ViewModel = new CTransformerPropetry_ViewModel(unitView, transformerObj);
                this._propGrid.LoadObject(obj);

                this._transformerBack = transformerObj;
                this.lastSelect = 3;
                return;
            }
        }

        if (sqEnclosureObj !== null) {
            let isDiff: boolean = this._sqEnclosureBack.id.equals(sqEnclosureObj.id) === false;
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 4)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: CSQEnclosurePropetry_ViewModel = new CSQEnclosurePropetry_ViewModel(unitView, sqEnclosureObj);
                this._propGrid.LoadObject(obj);

                this._sqEnclosureBack = sqEnclosureObj;
                this.lastSelect = 4;
                return;
            }
        }

        if (motorControlObj != null) {
            let isDiff: boolean = this._motorControlBack.id.equals(motorControlObj.id) === false;
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 5)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: CMotorControlProperty_ViewModel = new CMotorControlProperty_ViewModel(unitView, motorControlObj);
                this._propGrid.LoadObject(obj);

                this._motorControlBack = motorControlObj;
                this.lastSelect = 5;
                return;
            }
        }

        if (fpcControlObj != null) {
            let isDiff: boolean = this._fPCControllerEnclosureBack.id.equals(fpcControlObj.id) === false;
            if (this._propGrid.SelectedObjectInfo === null || isDiff || (!isDiff && this.lastSelect != 6)) {
                let unitView = this._workingService.WorkingUnit;

                let obj: CFPCControllerEnclosureProperty_ViewModel = new CFPCControllerEnclosureProperty_ViewModel(unitView, fpcControlObj);
                this._propGrid.LoadObject(obj);
                this.lastSelect = 6;

                this._fPCControllerEnclosureBack = fpcControlObj;
                return;
            }
        }


        if (doorObj === null && openingObj === null && transformerObj === null &&
            sqEnclosureObj === null && motorControlObj === null && fpcControlObj === null) {
            this._propGrid.clearContainer();
        }
    }


}
