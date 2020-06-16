import { Component } from "@angular/core";

import { WorkingDataService } from "@local/app/services/working-data.service";

@Component
    ({
        selector: "segment-selector",
        templateUrl: "./segment-selector.component.html",
        styleUrls:
            [
                "./segment-selector.component.css"
            ]
    })
export class SegmentSelectorComponent
{
    constructor(private _workingData: WorkingDataService)
    {
    }
    
    toggleFilter()
    {
        this._workingData.ShowFilter = !this._workingData.ShowFilter;
    }
    toggleFan()
    {
        this._workingData.ShowFan = !this._workingData.ShowFan;
    }
    toggleCoil()
    {
        this._workingData.ShowCoil = !this._workingData.ShowCoil;
    }
}