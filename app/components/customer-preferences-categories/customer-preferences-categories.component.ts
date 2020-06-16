import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Inject} from '@angular/core'; 
import { CustomerPreferencesToolBarComponent } from '../customer-preferences-toolbar/customer-preferences-toolbar.component';
import { ToggleSHComponent } from '../../shared/ui/toggleSH/toggleSH.component';

import { NgModel } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'customer-preferences-categories',
    templateUrl: './customer-preferences-categories.component.html',
    styleUrls: ['./customer-preferences-categories.component.css']
})
export class CustomerPreferencesCategoriesComponent implements OnChanges{

    @Input('showCat') show: boolean;
    @ViewChild(ToggleSHComponent) toggleGeneral: ToggleSHComponent;

        
    public model: any = {

        general: {
            Cabinet: true,
            Service: true,
            Electrical: true,
            Testing: true,
            Warranty: false,
            Seismic : false
        },
        coolingHeating: {
            CoolingCoils: true,
            HotWaterCoils: false,
            Steam: false,
            IntetgralFace: true,
            ElectricHeat : true
        },
        miscellaneous: {
            Standard: true,
            MulitZone: false,
            Humidifiers: true,
            SoundAttenuators: false,
            UvLights :false
        },
        fans: {
            fans: true,
            fansMotors: true
        },
        energy: {
            Wheel: true,
            AirToAir: false,
            Electric: true
        },
        filters: {
            Low: false,
            High: false,
            HEPA : true
        }
    } 

    constructor(@Inject(CustomerPreferencesToolBarComponent) private toolBar: CustomerPreferencesToolBarComponent
    ) { }

    ngOnChanges(changes: SimpleChanges): void {

    }    
 
    public onCloseModalClicked() {
        this.model = this.toolBar.category; // lihua: don't apply the changes when close
        this.toolBar.hideCustomerCategories();
    }

    myvalue = false;

    public btnApplyChangesClicked() {

        this.toolBar.category = this.model;  // lihua: must be executed before this.toolBar.applyChanges();
        this.toolBar.applyChanges();
        console.log('Apply Changess');
        
    }
}
