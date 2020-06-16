import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Inject } from "@angular/core";
import { ViewChild } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";
import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";

import { CoilConfigurationComponent } from "../coil-configuration/coil-configuration.component";

@Component
    ({
        selector: "coil-selection",
        templateUrl: "./coil-selection.component.html",
        styleUrls:
            [
                "./coil-selection.component.css"
            ]
    })
export class CoilSelectionComponent
{
    @Input('show') show: boolean;

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    model: any = {
        primaryId: '*',
        dataSource: [
            { "star": "", "MLP": "", "FinMatl": "", "LAT-DB": "", "LAT-WB": "", "TMBH": "", "SMBH": "", "APD": "", "LWT": "", "FPS": "", "WPD": "", "Rows": "", "FPI": "", "TPC": "", "GPM": "", "ConnSize": "", "NumConn.": "", "CoilWt": "", "FluidWt": "", "IntVol": "" },
            { "star": "", "MLP": "", "FinMatl": "", "LAT-DB": "", "LAT-WB": "", "TMBH": "", "SMBH": "", "APD": "", "LWT": "", "FPS": "", "WPD": "", "Rows": "", "FPI": "", "TPC": "", "GPM": "", "ConnSize": "", "NumConn": "", "CoilWt": "", "FluidWt": "", "IntVol": "" },
        ],
        columns: [
            { headerText: "*", key: "star", dataType: "string", width: "50px" },
            { headerText: "MLP(USD)", key: "MLP", dataType: "string", width: "100px" },
            { headerText: "FinMatl", key: "FinMatl", dataType: "string", width: "100px" },
            { headerText: "LAT-DB", key: "LAT-DB", dataType: "string", width: "100px" },
            { headerText: "LAT-WB", key: "LAT-WB", dataType: "string", width: "100px" },
            { headerText: "TMBH", key: "TMBH", dataType: "string", width: "auto" },
            { headerText: "SMBH", key: "SMBH", dataType: "string", width: "auto" },
            { headerText: "APD", key: "APD", dataType: "string", width: "100px" },
            { headerText: "FPS", key: "FPS", dataType: "string", width: "100px" },
            { headerText: "WPD", key: "WPD", dataType: "string", width: "100px" },
            { headerText: "Rows", key: "Rows", dataType: "string", width: "100px" },
            { headerText: "FPI", key: "FPI", dataType: "string", width: "100px" },
            { headerText: "TPC", key: "TPC", dataType: "string", width: "100px" },
            { headerText: "GPM", key: "GPM", dataType: "string", width: "100px" },
            { headerText: "Conn.Size", key: "ConnSize", dataType: "string", width: "100px" },
            { headerText: "#Conn.", key: "NumConn", dataType: "string", width: "100px" },
            { headerText: "CoilWt.", key: "CoilWt", dataType: "string", width: "100px" },
            { headerText: "FluidWt.", key: "FluidWt", dataType: "string", width: "100px" },
            { headerText: "Int.Vol.", key: "IntVol", dataType: "string", width: "100px" },
        ],
        show: this.show
    };


    @ViewChild('gridResult') igGrid: IgGridComponent;


    constructor(
        @Inject(CoilConfigurationComponent) private coilSelect: CoilConfigurationComponent)
    {
    }

    public onCloseModalClicked(): void
    {
        this.coilSelect.toggleModalView();
    }

    public done(): void
    {
        this.coilSelect.toggleModalView();
    }

    ngOnInit()
    {

    }
    ngAfterViewInit()
    {

    }
}