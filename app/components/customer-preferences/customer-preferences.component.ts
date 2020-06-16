import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerPreferencesCategoriesComponent } from '../customer-preferences-categories/customer-preferences-categories.component';

import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-customer-preferences',
  templateUrl: './customer-preferences.component.html',
  styleUrls: ['./customer-preferences.component.css']
})
export class CustomerPreferencesComponent implements OnInit {

    @ViewChild(CustomerPreferencesCategoriesComponent) customerPreferencesCategories: CustomerPreferencesCategoriesComponent;

    public cate: any;
    eventHandler(ca: any) {
        var str = JSON.stringify(ca); // remove binding automatically
        this.model = JSON.parse(str);
        this.cate = this.model;
    }
    
    model: any = {

        general: {
            Cabinet: true,
            Service: true,
            Electrical: true,
            Testing: true,
            Warranty: false,
            Seismic: false
        },
        coolingHeating: {
            CoolingCoils: true,
            HotWaterCoils: false,
            Steam: false,
            IntetgralFace: true,
            ElectricHeat: true
        },
        miscellaneous: {
            Standard: true,
            MulitZone: false,
            Humidifiers: true,
            SoundAttenuators: false,
            UvLights: false
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
            HEPA: true
        }
    } 

    public fansAccordionFooterText: string = "more options";
    public fansAccordionShowMoreOptions: boolean = false;

    modelSwitch: any = {
        test: true,
        viewPort: true,
        shaft: true
    }

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    public shaftChecked(value: any): void {
        console.log(value);
        this.modelSwitch.shaft = value;
    }  

 
    public onFansAccordionShowMoreOptionsClicked() {
        this.fansAccordionShowMoreOptions = !this.fansAccordionShowMoreOptions;
        this.fansAccordionFooterText = (this.fansAccordionShowMoreOptions === true ? 'default options' : 'more options');        
    }
}
