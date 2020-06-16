import { Component, ElementRef, Input, forwardRef, SimpleChanges, ViewChild, OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { PagingFeature, DefaultFeature, NoPagingFeature } from './iggrid-feature.component';

declare var jquery: any;
declare var $: any;


const CUSTOM_INPUT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IgGridComponent),
    multi: false
};

@Component({
    selector: 'idGridTable',
    providers: [CUSTOM_INPUT],
    template: `<table id={{idTable}} #idGridTable ></table>`,
    styleUrls: ['./iggrid.component.css']

})

export class IgGridComponent implements OnChanges {

    @Input('showGrid') show: boolean;
    @Input('primaryId') primaryId: string;
    @Input('dataSource') dataSource: any[];
    @Input('columns') columns: any[];
    @Input('idTable') idTable: string;
    @Input('features') features: any[];

    @Input("rendercheckboxes")
    renderCheckboxes: boolean = false;

    @ViewChild("idGridTable") private _table: ElementRef;

    private _features: any[]

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.features = this.features || this.getFeature('default');
        this.createTable();

    }

    public updateTable(feature : string): void {
        this.features = this.getFeature(feature);
        let idTable = `#${this._table.nativeElement.id}`;
        $(idTable).igGrid('destroy');
        this.createTable();
    }

    public createTable(): void {
        let idTable = `#${this._table.nativeElement.id}`;
        $(idTable).igGrid({
            primaryKey: this.primaryId,
            width: "100%",
            // fixedHeaders: true,     
            columns: this.columns,
            dataSource: this.dataSource,
            features: this.features,
            renderCheckboxes: this.renderCheckboxes,
            autoCommit: true
        });     
    }


    private getFeature(feature: string): any[] {  
    
        switch (feature) {
            case 'Paging':
                return PagingFeature;
            case 'NoPaging':
                return NoPagingFeature;
            default:
                return DefaultFeature;
        } 
    }
}