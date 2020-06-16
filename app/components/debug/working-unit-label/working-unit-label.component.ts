import { Component } from "@angular/core";

import * as ModelAHU from "@jci-ahu/data.ahu.model";
import { WorkingDataService } from "../../../services/working-data.service";
import { retry } from "rxjs/operators";

@Component
({
    selector: "working-unit-label",
    templateUrl: "./working-unit-label.component.html",
    styleUrls:
        [
            "./working-unit-label.component.css"
        ]
})
export class WorkingUnitLabelComponent
{
    constructor(private _WORKING_DATA: WorkingDataService)
    {
    }

    public get Caption(): string
    {
        if (this._WORKING_DATA.WorkingUnit === null)
        {
            return "No Working Unit Detected";
        }

        return `[${this._WORKING_DATA.WorkingUnit.SalesOrderNumber}] ${this._WORKING_DATA.WorkingUnit.JobName}`;
    }
}