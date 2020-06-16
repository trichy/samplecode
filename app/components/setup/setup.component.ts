import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as ModelInterfacesShared from "@jci-ahu/data.shared.model.interfaces";

import { CUnit_ViewModel } from "../unit-configuration/view-model/CUnit_ViewModel";
import { WorkingDataService } from "../../services/working-data.service";
import { ModelAccessService } from "@jci-ahu/services.data-access";
import { CDoorSelected } from "../unit-configuration/view-model/CDoorSelected";
import { CSegmentSelected } from "../unit-configuration/view-model/CSegmentSelected";

@Component
({
    selector: "setup-component",
    templateUrl: "./setup.component.html",
    styleUrls:
    [
        "./setup.component.css"
    ]
})
export class SetupComponent implements OnInit
{
    constructor(
        private _router: Router,
        private _workingData: WorkingDataService,
        private _modelAccess: ModelAccessService)
    {
    }
       
    ngOnInit()
    {
        this.getUnit = this.getUnit.bind(this);
        this.newUnit = this.newUnit.bind(this);
    }

    public async getUnit(
        orderNo: string,
        format: ModelInterfacesShared.E_SerializationFormat): Promise<ModelInterfacesAHU.Configuration.Types.IUnit>
    {
        let unit: ModelInterfacesAHU.Configuration.Types.IUnit;

        unit = await this._modelAccess.DB_GetCurrentUnit(
            orderNo,
            format);

        console.log("From Setup Component GetUnit()");
        console.log(`unit.isSelfChanged() = ${unit.isSelfChanged()}`);
        console.log(`unit.areChildrenChanged() = ${unit.areChildrenChanged()}`);
        console.log(`unit.anyChanges() = ${unit.anyChanges()}`);
        
        return unit;
    }

    public async newUnit(): Promise<ModelInterfacesAHU.Configuration.Types.IUnit>
    {
        let unit: ModelInterfacesAHU.Configuration.Types.IUnit;

        unit = await this._modelAccess.NewUnit();
        unit.salesOrderNumber = await this._modelAccess.GetTestOrderNumber();

        return unit;
    }

    public unitGenerator_onGetUnit(unit: ModelInterfacesAHU.Configuration.Types.IUnit)
    {
        CDoorSelected.clearDoors();
        CSegmentSelected.Dispose();
        this._workingData.WorkingUnit = new CUnit_ViewModel(unit);
        this._workingData.WorkingUnitBackUp = new CUnit_ViewModel(this._workingData.WorkingUnit.model.cloneUnit(false));
        this._router.navigate(["/unit-configuration"]);
    }

    public get UnitViewModel(): CUnit_ViewModel
    {
        return this._workingData.WorkingUnit;
    }

    public get ShowDebugComponent(): boolean
    {
        return this._workingData.showDebugComponent;
    }
    public set ShowDebugComponent(value: boolean)
    {
        this._workingData.showDebugComponent = value;
    }
} 