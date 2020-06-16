import { Component, OnInit, Inject, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
//import { ModalComponent } from '../../shared/ui/modal/modal.component';
//import { FilterConstructOverridesComponent } from '../unit-configuration-filter-const-overrides/unit-configuration-filter-const-overrides.component';
import { UnitConfigurationCoilComponent } from '../unit-configuration-coils/unit-configuration-coil.component';
import { IgGridComponent } from '../../shared/ui/igGrid/iggrid.component';
import { igGridCfg } from '../../models/igGrid/igGridCfg.model';

@Component({
    selector: 'coil-select-modal',
    templateUrl: './coil-select-modal.Component.html',
    styleUrls: ['./coil-select-modal.Component.css']
})
export class CoilSelectModalComponent {

    @Input('show') show: boolean;

    model: any = {
        primaryId: '*',
        dataSource: [
            { "*": "", "MLP(USD)": "", "FinMatl": "", "LAT-DB": "", "LAT-WB": "", "TMBH": "", "SMBH": "", "APD": "", "LWT": "", "FPS": "", "WPD": "", "Rows": "", "FPI": "", "TPC": "", "GPM": "", "Conn.Size": "", "#Conn.": "", "CoilWt.": "", "FluidWt.": "", "Int.Vol.": "" },
            { "*": "", "MLP(USD)": "", "FinMatl": "", "LAT-DB": "", "LAT-WB": "", "TMBH": "", "SMBH": "", "APD": "", "LWT": "", "FPS": "", "WPD": "", "Rows": "", "FPI": "", "TPC": "", "GPM": "", "Conn.Size": "", "#Conn.": "", "CoilWt.": "", "FluidWt.": "", "Int.Vol.": "" },
        ],
        columns: [
            { headerText: "*", key: "*", dataType: "string", width: "50px" },
            { headerText: "MLP(USD)", key: "MLP(USD)", dataType: "string", width: "100px" },
            { headerText: "FinMatl", key: "FinMatl", dataType: "string", width: "100px" },
            { headerText: "LAT-DB", key: "LAT-DB", dataType: "string", width: "100px" },
            { headerText: "LAT-WB", key: "LAT-WB", dataType: "string", width: "100px" },
            { headerText: "TMBH", key: "TMBH", dataType: "string", width: "auto" },
            { headerText: "SMBH", key: "SMBH", dataType: "string", width: "auto" },
            { headerText: "APD", key: "APD", dataType: "string", width: "100px" },
            { headerText: "FPS", key: "FPS", dataType: "string", width: "100px" },
            { headerText: "WPD", key: "WPD", dataType: "string", width: "100px" },
            { headerText: "Rows", key: "Rows", dataType: "string", width: "100px" },
            { headerText: "FPI", key: "FPI", dataType: "string", width: "100px" },
            { headerText: "TPC", key: "TPC", dataType: "string", width: "100px" },
            { headerText: "GPM", key: "GPM", dataType: "string", width: "100px"  },
            { headerText: "Conn.Size", key: "Conn.Size", dataType: "string", width: "100px" },
            { headerText: "#Conn.", key: "#Conn.", dataType: "string", width: "100px" },
            { headerText: "CoilWt.", key: "CoilWt.", dataType: "string", width: "100px" },
            { headerText: "FluidWt.", key: "FluidWt.", dataType: "string", width: "100px" },
            { headerText: "Int.Vol.", key: "Int.Vol.", dataType: "string", width: "100px" },
        ],
        show: this.show
    };


    @ViewChild('gridResult') igGrid: IgGridComponent;


    constructor(
        @Inject(UnitConfigurationCoilComponent) private coilSelect: UnitConfigurationCoilComponent) {
    }

    public onCloseModalClicked(): void {
        this.coilSelect.toggleModalView();
    }

    public done(): void {
        this.coilSelect.toggleModalView();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }


}