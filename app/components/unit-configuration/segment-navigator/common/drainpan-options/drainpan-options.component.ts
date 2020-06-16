import { Component } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "drainpan-options",
        templateUrl: "./drainpan-options.component.html",
        styleUrls:
            [
                "./drainpan-options.component.css"
            ]
    })
export class DrainPanOptionsComponent
{
    @Input("drainpan")
    drainpan: ModelInterfacesAHU.Configuration.Types.IDrainPan = null;
}