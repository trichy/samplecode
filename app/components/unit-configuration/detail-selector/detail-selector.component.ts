import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CUnit_ViewModel } from "../view-model/CUnit_ViewModel";
import { UnitViewer3DComponent } from "@local/app/components/unit-configuration/unit-viewer-3d/unit-viewer-3d.component";


@Component
    ({
        selector: "detail-selector",
        templateUrl: "./detail-selector.component.html",
        styleUrls:
            [
                "./detail-selector.component.css"
            ]
    })
export class DetailSelectorComponent implements OnInit {

    @Input("unit")
    _unit: CUnit_ViewModel = null;
    segmentSelected: boolean = true;
    airpathSelected: boolean = false;    
    openingsSelected: boolean = true;
    bulkheadSelected: boolean = false;
    showDoorsOpen: boolean = true;
   
    @Output() enableAirlFlowIndicatore: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor() {
    }

    ngOnInit(): void {
        //console.log(this._unit);
    }

    onSegmentSelected(e) {
            this._unit.segmentList.forEach((seg) => {
                seg.isEnabled = e.target.checked;
            })
    }

    onAirpathSelected(e) {
          this._unit.segmentList.forEach((airpath) => {
                airpath.isAirFlowEnabled = e.target.checked;
        })
        this.enableAirlFlowIndicatore.emit(true);
    }

    onOpeningsSelected(e) {
        this._unit.segmentList.forEach((seg) => {
            seg.isOpeningsEnabled = e.target.checked;
        });        
    }

    onBulkheadSelected(e) {
        this._unit.bulkheadList.forEach((bulkhead) => {
            bulkhead.isEnabled = e.target.checked;
        });  
    }

    onShowDoorsOpen(e) {
        this._unit.segmentList.forEach((seg) => {
            seg.showDoorsOpenEnabled = e.target.checked;
        });
    }
}