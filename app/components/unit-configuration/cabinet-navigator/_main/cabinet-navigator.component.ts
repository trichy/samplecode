import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { CAirPath_ViewModel } from "../../view-model/CAirPath_ViewModel";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as SegmentTypes from "../../segment-navigator/segment-types";
import { TunnelNavigatorComponent } from "@local/app/components/unit-configuration/tunnel-navigator/tunnel-navigator.component";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import { ConstructionComponent } from "@local/app/components/unit-configuration/cabinet-navigator/construction/construction.component";
import { AirpathDisplayComponent } from "@local/app/components/unit-configuration/cabinet-navigator/display-airpath/airpath-display.component";
import { UnitConfigurationComponent } from "../../../unit-configuration/_main/unit-configuration.component";
@Component
    ({
        selector: "cabinet-navigator",
        templateUrl: "./cabinet-navigator.component.html",

        styleUrls:
            [
                "./cabinet-navigator.component.css"
            ]
    })
export class CabinetNavigatorComponent implements OnInit {

    @Input("unit")
    _unit: CUnit_ViewModel = null;
 
    showCabinetView = false;

    constructor() {
    }
    ngOnInit(): void {
       
    }


    public showunitTabs() {

        this.showCabinetView = !this.showCabinetView;
    }




}
