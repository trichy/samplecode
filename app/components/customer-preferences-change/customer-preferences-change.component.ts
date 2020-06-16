import { Component, OnInit, Inject, OnChanges,  ViewChild, Input, SimpleChanges } from '@angular/core';
import { CustomerPreferencesToolBarComponent } from '../customer-preferences-toolbar/customer-preferences-toolbar.component';
import { IgGridComponent } from '../../shared/ui/igGrid/iggrid.component';
 ;
 

@Component({
    selector: 'customer-preferences-change',
    templateUrl: './customer-preferences-change.component.html',
    styleUrls: ['./customer-preferences-change.component.css']
})

export class CustomerPreferencesChangeComponent  {
    @Input('show') show: boolean;

    model: any = {
        primaryId: 'SpecificationId',
        dataSource :  [
            { "SpecificationId": 1, "Specification": "RDK Outdoor AHUs", "SalesOffice": "Boston Sales Office", "Project": "", "LastUpdated": "02/1/2018" },
            { "SpecificationId": 2, "Specification": "Cambrdige Stadium", "SalesOffice": "Boston Sales Office", "Project": "", "LastUpdated": "02/1/2018" },
            { "SpecificationId": 3, "Specification": "Cambrdige Library", "SalesOffice": "Boston Sales Office", "Project": "", "LastUpdated": "02/2/2018" },
            { "SpecificationId": 4, "Specification": "Solution XT Base Specification", "SalesOffice": "Hartford CT Sales Office", "Project": "", "LastUpdated": "02/3/2018" },
            { "SpecificationId": 316, "Specification": "Boston Office Standard", "SalesOffice": "Johnson Controls Corporate", "Project": "", "LastUpdated": "02/1/2018" },
            { "SpecificationId": 317, "Specification": "Taunton Public Schools", "SalesOffice": "Boston Sales Office", "Project": "", "LastUpdated": "02/8/2018" }
        ],
        columns: [
            { headerText: "Specification ID", key: "SpecificationId", dataType: "string", width: "auto", allowHiding: true, hidden: true },
            { headerText: "Specification", key: "Specification", dataType: "string", width: "auto" },
            { headerText: "Sales Office", key: "SalesOffice", dataType: "string", width: "auto" },
            { headerText: "Project", key: "Project", dataType: "string", width: "auto" },
            { headerText: "Last Updated", key: "LastUpdated", dataType: "date", width: "130px" }
        ],
        show: this.show
    }

    @ViewChild('gridResult')
    private grid: IgGridComponent;

    constructor(
        @Inject(CustomerPreferencesToolBarComponent)
        private toolBar: CustomerPreferencesToolBarComponent) {
        
    }

   

    
    public onCloseModalClicked() : void {
        this.toolBar.hideCustomerPreferences();
    }

    public btnChooseSpecificationClicked() {
        this.toolBar.hideCustomerPreferences();
        console.log('choose');
    }
}
