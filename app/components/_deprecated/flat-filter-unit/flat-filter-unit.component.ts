import { Component, OnInit, ViewChild, Inject } from '@angular/core';

@Component({
    selector: 'flat-filter-unit',
    templateUrl: './flat-filter-unit.component.html',
    styleUrls: ['./flat-filter-unit.component.css']
})


export class FlatFilterUnitComponent implements OnInit {
    ngOnInit(): void { }
    baseAppUrl: string = "";
    imageUrl: string = '';

    constructor( @Inject('BASE_APP_URL') baseUrl: string) {
        this.baseAppUrl = baseUrl;
        this.imageUrl = this.baseAppUrl + "images/png/FF.png";

    }
}