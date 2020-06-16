import { Component } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "construction-overrides",
        templateUrl: "./construction-overrides.component.html",
        styleUrls:
            [
                "./construction-overrides.component.css"
            ]
    })
export class ConstructionOverridesComponent
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;
}