import { Component } from "@angular/core";
import { WorkingDataService } from "../../../services/working-data.service";

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

        return `[${this._WORKING_DATA.WorkingUnit.model.salesOrderNumber}] ${this._WORKING_DATA.WorkingUnit.model.jobName}`;
    }
}