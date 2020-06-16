import { Injectable } from "@angular/core";

import { Guid } from "@jci-ahu/shared.guid";
import { CUtility } from "@jci-ahu/shared.utility";

import { CUnit_ViewModel } from "../components/unit-configuration/view-model/CUnit_ViewModel";
import { PreferencesDataListResponse } from "../models/project-settings/preferences-data-list-response.model";

@Injectable
    ({
        providedIn: "root"
    })
export class WorkingDataService
{
    // #region WorkingUnit

    private _workingUnit: CUnit_ViewModel = null;

    public get WorkingUnit(): CUnit_ViewModel
    {
        return this._workingUnit;
    }
    public set WorkingUnit(unit: CUnit_ViewModel)
    {
        this._workingUnit = unit;
    }
    
    // #endregion

    // #region BackUp WorkingUnit

    private _workingUnitBackUp: CUnit_ViewModel = null;

    public get WorkingUnitBackUp(): CUnit_ViewModel {
        return this._workingUnitBackUp;
    }
    public set WorkingUnitBackUp(unit: CUnit_ViewModel) {
        this._workingUnitBackUp = unit;
    }

    // #endregion

    // #region showDebugComponent

    private _showDebugComponent: boolean = false;

    public get showDebugComponent(): boolean
    {
        return this._showDebugComponent;
    }
    public set showDebugComponent(value: boolean)
    {
        this._showDebugComponent = value;
    }

    // #endregion


    // #region showCustomerPreference

    private _showCustomerPreferences: boolean = false;

    public get showCustomerPreferences(): boolean {
        return this._showCustomerPreferences;
    }
    public set showCustomerPreferences(value: boolean) {
        this._showCustomerPreferences = value;
    }

    // #endregion

    // #region selNavItemID

    private _selNavItemID: Guid = Guid.empty();

    public get selNavItemID(): Guid
    {
        return this._selNavItemID;
    }
    public set selNavItemID(value: Guid)
    {
        this._selNavItemID = value;
    }

    // #endregion

    // #region selNavSessionToken

    public get selNavSessionToken(): string
    {
        let elem: HTMLInputElement = <HTMLInputElement>document.getElementById("sessionTokenId");

        if (CUtility.isNull(elem) === false)
        {
            return elem.value;
        }

        return "";
    }
    public set selNavSessionToken(value: string)
    {
        let elem: HTMLInputElement = <HTMLInputElement>document.getElementById("sessionTokenId");

        if (CUtility.isNull(elem) === false)
        {
            elem.value = value;
        }
    }

    // #endregion

    // #region IsAirFlowOn

    private _isAirFlowOn: boolean = false;

    public get IsAirFlowOn(): boolean
    {
        return this._isAirFlowOn;
    }
    public set IsAirFlowOn(value: boolean)
    {
        this._isAirFlowOn = value;
    }

    // #endregion

    //
    // Temporary flags to control component visibility 
    // in viewer.   
    //
    // Current implementation is really not useful as it 
    // only allows for single components (i.e. only one fan segment).
    // We're just moving from a jquery css class toggling 
    // mechanism to a more "angular" methodology (communicating 
    // thru a service).  Limitations still apply.
    //
    // Eventually we're probably going to want to wrap this information
    // around the segment classes in the model and control visibility 
    // from the wrapper classes.
    //

    // #region ShowFilter

    private _showFilter: boolean = false;

    public get ShowFilter(): boolean
    {
        return this._showFilter;
    }
    public set ShowFilter(value: boolean)
    {
        this._showFilter = value;
    }

    // #endregion

    // #region ShowFan

    private _showFan: boolean = false;

    public get ShowFan(): boolean
    {
        return this._showFan;
    }
    public set ShowFan(value: boolean)
    {
        this._showFan = value;
    }

    // #endregion

    // #region ShowCoil

    private _showCoil: boolean = false;

    public get ShowCoil(): boolean
    {
        return this._showCoil;
    }
    public set ShowCoil(value: boolean)
    {
        this._showCoil = value;
    }

    // #endregion

    // #region Custom Preferences

    private _preferences: PreferencesDataListResponse = null;

    public get Preferences(): PreferencesDataListResponse {
        return this._preferences;
    }
    public set Preferences(value: PreferencesDataListResponse) {
        this._preferences = value;
    }

    // #endregion
}