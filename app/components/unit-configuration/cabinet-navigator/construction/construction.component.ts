import { Component, OnInit, Input } from '@angular/core';
import { CabinetNavigatorComponent } from "@local/app/components/unit-configuration/cabinet-navigator/_main/cabinet-navigator.component";
import { ShellService } from "../../../../core/shellServices/shell.service";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component({
    selector: 'app-construction',
    templateUrl: './construction.component.html',
    styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit {

    @Input("unit")
    _unit: ModelInterfacesAHU.Configuration.Types.IUnitOptions = null;

    airflow: number = 6000;

    constructor(private cabinetService: ShellService) {

    }

    ngOnInit() {
    }

    cabinetValueChange(value) {
        this.cabinetService.onCabinetOptionsChange();
    }
}
