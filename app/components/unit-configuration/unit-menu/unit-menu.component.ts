import { Component, OnInit, Output, EventEmitter, ElementRef} from "@angular/core";
import { WorkingDataService } from "@local/app/services/working-data.service";
import { Input } from "@angular/core";
import { CabinetNavigatorComponent } from '../cabinet-navigator/_main/cabinet-navigator.component';
import { ConstructionComponent } from "@local/app/components/unit-configuration/cabinet-navigator/construction/construction.component";

@Component({
    selector: 'unit-menu',
    templateUrl: './unit-menu.component.html',
    styleUrls:
        [
            "./unit-menu.component.css"
        ]
})

export class UnitMenuComponent {
    selectedPanel = 1;
    filterUrl: string = 'images/png/Air-Filter.png';
    supplyfanUrl: string = 'images/png/SupplyFan.png';
    coolingCoilUrl: string = 'images/png/CoolingCoil.png';
    heatingCoilUrl: string = 'images/png/HeatingCoil.png';
    ipUrl: string = 'images/png/IP_Image.png';
    dpUrl: string = 'images/png/DP.png';
    turningUrl: string = 'images/png/Turning.png';
    plateUrl: string = 'images/png/Plate.png';
    heatWheelUrl: string = 'images/png/HeatWheel.png'
    accessDoorUrl: string = 'images/png/Access_Door.png';
    openingUrl: string = 'images/png/Opening.png';
    cabinetUrl: string = 'images/png/Cabinet.png';

    @Input() parentCanvas: ElementRef;
    @Output('dragMenuEnd') dragEnd: EventEmitter<any> = new EventEmitter<any>();

    @Output() enableCabinate: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() CabinetNavigatorComponent

    constructor(private _workingData: WorkingDataService) {
    }

    ngAfterViewInit() {
        var panels = $('#stackPanel').find('.panel-collapse');
        panels.siblings('.panel-heading').addClass('collapsed');
    }


    onEndDrag(event: any): void {
       // console.log(event);
        this.dragEnd.emit(event);
    }

    public showunitTabs() {
        console.log("show in table")
        this.enableCabinate.emit(true);
       // this.CabinetNavigatorComponent.showCabinetView();


    }

}