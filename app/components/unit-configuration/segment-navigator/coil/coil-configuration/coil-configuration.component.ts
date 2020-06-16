import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "coil-configuration",
        templateUrl: "./coil-configuration.component.html",
        styleUrls:
            [
                "./coil-configuration.component.css"
            ]
    })
export class CoilConfigurationComponent
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    showModal: boolean = false;

    toggleModalView()
    {
        this.showModal = !this.showModal;
    }
}