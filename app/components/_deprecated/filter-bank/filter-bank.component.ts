import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import * as ModelAHU from "@jci-ahu/data.ahu.model";


declare var jquery: any;
declare var $: any;

@Component({
    selector: 'filter-bank',
    templateUrl: './filter-bank.component.html',
    styleUrls: ['./filter-bank.component.css']
})
export class FilterBankComponent implements OnChanges, OnInit{

    @Input("filterbank")
    public filterBank: ModelAHU.Configuration.Types.CFilterBank = null;

    @Input() showFlat: boolean;
    constructor() {
        
    }

    public async ngOnInit() {
        this.loadDefaultOptions();
    }

    public async loadDefaultOptions() {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        //threeDimensionalPresenterModule.initialize();
    }
   
    ngAfterViewInit() {

    }

   }
