import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import { CAirPath_ViewModel } from "../../view-model/CAirPath_ViewModel";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as SegmentTypes from "../../segment-navigator/segment-types";
import { TunnelNavigatorComponent } from "@local/app/components/unit-configuration/tunnel-navigator/tunnel-navigator.component";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";

@Component
    ({
        selector: "airpath-display",
        templateUrl: "./airpath-display.component.html",

        styleUrls:
            [
                "./airpath-display.component.css"
            ]
    })
export class AirpathDisplayComponent implements OnInit {

    @Input("unit")
    _unit: CUnit_ViewModel = null;
  
    constructor() {
    }

    ngOnInit(): void {
      
    }

 

}
