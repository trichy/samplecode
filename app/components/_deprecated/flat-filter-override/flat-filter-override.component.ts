import { Component, OnInit, Inject, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
//import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { UnitConfigurationFiltersComponent } from '../unit-configuration-filters/unit-configuration-filters.component';
import { IgGridComponent } from '../../shared/ui/igGrid/iggrid.component';
import { igGridCfg } from '../../models/igGrid/igGridCfg.model';

@Component({
    selector: 'flat-filter-override',
    templateUrl: './flat-filter-override.component.html',
    styleUrls: ['./flat-filter-override.component.css']
})
export class FlatFilterOverrideComponent {

    @Input('show') show: boolean;

    model: any = {
        primaryId: 'OptionName',
        dataSource: [
            { "OptionName": "Filter Depth", "OriginalValue": "2", "OverrideValue": "", "Weight": "", "Length": "", "Price": "", "ForRelease": "", "Attachments": "" },
            { "OptionName": "Filter Media", "OriginalValue": "Pleated 30% (MERV 8)", "OverrideValue": "", "Weight": "", "Length": "", "Price": "", "ForRelease": "", "Attachments": "" },
        ],
        columns: [
            { headerText: "Option Name", key: "OptionName", dataType: "string", width: "130px" },
            { headerText: "Original Value", key: "OriginalValue", dataType: "string", width: "130px" },
            { headerText: "Override Value", key: "OverrideValue", dataType: "string", width: "130px" },
            { headerText: "Weight", key: "Weight", dataType: "string", width: "auto" },
            { headerText: "Length", key: "Length", dataType: "string", width: "auto" },
            { headerText: "Price", key: "Price", dataType: "string", width: "auto" },
            { headerText: "For Release?", key: "ForRelease", dataType: "string", width: "130px" },
            { headerText: "Attachments", key: "Attachments", dataType: "string", width: "130px" },
        ],
        show: this.show
    };


    @ViewChild('gridResult') igGrid: IgGridComponent;


    constructor(
        @Inject(UnitConfigurationFiltersComponent) private unitConfiguration: UnitConfigurationFiltersComponent) {
    }

    public onCloseModalClicked(): void {
        this.unitConfiguration.toggleModalView();
    }

    public done(): void {
        this.unitConfiguration.toggleModalView();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }


}