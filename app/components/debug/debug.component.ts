import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { Inject } from "@angular/core";
import { ElementRef } from "@angular/core";

import { CookieService } from "ngx-cookie";

import { WorkingDataService } from "@local/app/services/working-data.service";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { CUtility } from "@jci-ahu/shared.utility";
import { Guid } from "@jci-ahu/shared.guid";
import { SelNavService } from "@jci-ahu/services.data-access";
import { ModelAccessService } from "@jci-ahu/services.data-access";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import { ToastrService } from '../../common/toastr/toastr.service';

@Component
    ({
        selector: "debug-component",
        templateUrl: "./debug.component.html",
        styleUrls:
            [
                "./debug.component.css"
            ]
    })
export class DebugComponent implements OnInit
{
    constructor(
        private _workingData: WorkingDataService,
        private _selNav: SelNavService,
        private _modelAccess: ModelAccessService,
        private _router: Router,
        private _cookieService: CookieService,
        private _toastr: ToastrService)
    {

    }

    @ViewChild("sessionid")
    _sessionid_input: ElementRef = null;

    @ViewChild("ticket")
    _ticket_input: ElementRef = null;

    @ViewChild("itemid")
    _itemid_input: ElementRef = null;

    _ready: boolean = true;
    loadFrom_SessionID: string = "";

    async ngOnInit()
    {
    }

    public getSessionID(): string
    {
        if (this.hasSessionID() === false)
        {
            return "No Session - Running Outside of SelNav?"
        }

        return this._workingData.selNavSessionToken;
    }
    public getAuthenticationTicket(): string
    {
        if (this.hasAuthenticationTicket() === false)
        {
            return "No Authentication Ticket - Running Outside of SelNav?";
        }

        return this._cookieService.get("SNAuthenticationTicket");
    }
    public getItemID(): string
    {
        if (this.hasItemID() === false)
        {
            return "No Item ID - Is New Configuration or Running Outside of Sel Nav?";
        }

        return this._workingData.selNavItemID.toString();
    }

    public hasSessionID(): boolean
    {
        if (CUtility.isNullOrWhiteSpace(this._workingData.selNavSessionToken))
        {
            return false;
        }

        return true;
    }
    public hasAuthenticationTicket(): boolean
    {
        if (CUtility.isNullOrWhiteSpace(this._cookieService.get("SNAuthenticationTicket")))
        {
            return false;
        }

        return true;
    }
    public hasItemID(): boolean
    {
        if (this._workingData.selNavItemID.equals(Guid.empty()))
        {
            return false;
        }

        return true;
    }

    public copySessionID(evt: Event)
    {
        this._sessionid_input.nativeElement.select();
        document.execCommand("copy");
        this._sessionid_input.nativeElement.setSelectionRange(0, 0);
    }
    public copyAuthenticationTicket(evt: Event)
    {
        this._ticket_input.nativeElement.select();
        document.execCommand("copy");
        this._ticket_input.nativeElement.setSelectionRange(0, 0);
    }
    public copyItemID(evt: Event)
    {
        this._itemid_input.nativeElement.select();
        document.execCommand("copy");
        this._itemid_input.nativeElement.setSelectionRange(0, 0);
    }

    public async loadFromSessionID_OnClick(evt: Event)
    {
        try
        {
            this._ready = false;

            this._workingData.selNavSessionToken = this.loadFrom_SessionID;

            if (CUtility.isNullOrWhiteSpace(this._workingData.selNavSessionToken) === false)
            {
                this._workingData.selNavItemID = new Guid(await this._selNav.GetItemID(this._workingData.selNavSessionToken));

                if (this._workingData.selNavItemID.equals(Guid.empty()))
                {
                    this._workingData.WorkingUnit = new CUnit_ViewModel(await this._modelAccess.NewUnit());
                }
                else
                {
                    let unit = await this._modelAccess.SelNav_GetCurrentUnit(
                        this._workingData.selNavSessionToken,
                        this._workingData.selNavItemID);

                    if (unit === null)
                    {
                        unit = await this._modelAccess.NewUnit();

                        this._toastr.error("Unable To Find Unit For This Item ID - Creating New Unit Configuration");
                    }

                    this._workingData.WorkingUnit = new CUnit_ViewModel(unit);
                }
            }
        }
        finally
        {
            this._ready = true;
        }
    }
}