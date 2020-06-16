import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

declare var jquery: any;
declare var $: any;
//declare var threeDimensionalPresenterModule: any;

@Component({
    selector: 'unit-3D-configurator',
    templateUrl: './unit-3D-configurator.component.html',
    styleUrls: ['./unit-3D-configurator.component.css']
})
export class Unit3DConfiguratorComponent implements OnInit, OnChanges {
    tbMaxBankWidth: number = 120;
    tbMaxBankHeight: number = 88;
    savedFilterMaxBank: any;

    @Input() showFlat: boolean;
    constructor() { }

    ngOnInit() {
        this.loadSavedData();

    }

    ngOnChanges(changes: SimpleChanges): void {
   
        //threeDimensionalPresenterModule.initialize();
    }

    ngAfterViewInit() {
        //$('#btnConfigure').click(function () { threeDimensionalPresenterModule.generateView(); });

        //threeDimensionalPresenterModule.initialize();
    }

    loadSavedData() {

        if (localStorage.getItem('filterConfigSave') != null) {
            //get the data

            this.savedFilterMaxBank = <any>JSON.parse(localStorage.getItem('filterConfigSave') || '');
            this.tbMaxBankHeight = this.savedFilterMaxBank.maxBankH;
            this.tbMaxBankWidth = this.savedFilterMaxBank.maxBankW;

        }
       
    }
}
