import { Component, ViewChild, forwardRef, ContentChildren  } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router"; 
import { WorkingDataService } from "@local/app/services/working-data.service";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { UnitViewerComponent } from "../../unit-configuration/unit-viewer/unit-viewer.component";
import { UnitNavigatorComponent } from "../../unit-configuration/unit-navigator/unit-navigator.component";
import { CabinetNavigatorComponent } from "../cabinet-navigator/_main/cabinet-navigator.component";


@Component
    ({
        selector: "unit-configuration",
        templateUrl: "./unit-configuration.component.html",
        styleUrls:
            [
                "./unit-configuration.component.css"
            ]
    })
export class UnitConfigurationComponent implements OnInit {
    @ViewChild(forwardRef(() => UnitViewerComponent))
    private unitViewer: UnitViewerComponent

    @ViewChild(forwardRef(() => UnitNavigatorComponent))
    private unitNavigator: UnitNavigatorComponent

    @ViewChild(forwardRef(() => CabinetNavigatorComponent))
    private CabinetNavigatorComponentRef: CabinetNavigatorComponent

    constructor(
        private _workingData: WorkingDataService,
        private _router: Router) {
    }

    public get unit(): ModelInterfacesAHU.Configuration.Types.IUnit {
        if (this._workingData.WorkingUnit !== null) {
            return this._workingData.WorkingUnit.model;
        }

        return null;
    }

    ngOnInit() {
        if (this.unit === null) {
            this._router.navigate(["setup"]);
        }
    } 
    public enableAirlFlowIndicatore() {
        this.unitViewer.enableAirflowIndicatore();
    }

    public viewChanged(view: number): void {
        this.unitViewer.viewChanged(view);
    }

    public validateSegmentSelected(value: boolean): void {
        this.unitNavigator.activateSelectedMenu();
    }
    public activateCabinate(value: boolean): void {
        this.CabinetNavigatorComponentRef.showunitTabs();
    }


    public setTunnelFocus(selectedTunnel: object): void {
        this.unitViewer.setTunnelFocus(selectedTunnel);
    }

    public onNewSegmentAdded(segment: any): void {      
        console.log('new segment added');
    }

    public deleteSegment(selectedSegment): void {
        this.unitViewer.deleteSegment(selectedSegment);
    }
}
