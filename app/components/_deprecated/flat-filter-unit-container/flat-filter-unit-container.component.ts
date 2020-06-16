import { Component, OnInit, ViewChild, OnChanges, Inject, Input, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { AddFlatFilterUnit } from '../../models/flat-filter-unit/add-flat-filter-unit.model';
import { AddFlatFilterDirective } from '../../core/flat-filter-unit/add-flat-fliter-unit.directive'; 
import { FlatFilterUnitComponent } from '../../components/flat-filter-unit/flat-filter-unit.component';
import { debug } from 'util';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as global from '../unit-configuration/global';

@Component({
    selector: 'flat-filter-unit-container',
    templateUrl: './flat-filter-unit-container.component.html',
    styleUrls: ['./flat-filter-unit-container.component.css']
})


export class FlatFilterUnitContainerComponent implements OnInit, OnDestroy  {

    @Input('flatFilterUnits') flatFilterUnits: AddFlatFilterUnit[];   
    @ViewChild(AddFlatFilterDirective) addFlatFilterUnit: AddFlatFilterDirective;
    currentAdIndex = -1;
    ngOnInit(): void { }
    baseAppUrl: string = "";

    @Output('clickSegmentEvent')
    protected clickSegmentEvent: EventEmitter<global.TabItem> = new EventEmitter();

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        @Inject('BASE_APP_URL') baseUrl: string) {
        this.baseAppUrl = baseUrl;
    }
 

    public loadFlatFilterUnit(units: AddFlatFilterUnit[]): void {    
        this.flatFilterUnits = units;
        if (this.flatFilterUnits.length === 0) return;     

        let viewContainerRef = this.addFlatFilterUnit.viewContainerRef;
        viewContainerRef.clear();
   
        for (let i = 0; i <= this.flatFilterUnits.length - 1; i++) {
            let adItem = this.flatFilterUnits[i];
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
            let componentRef = viewContainerRef.createComponent(componentFactory);
        }
        
    }

    ngOnDestroy(): void {
        this.flatFilterUnits = [];
    }

    onClickFilterSegment(event: any) {
        let tab: global.TabItem;
        tab = global.CurrentUnit.tabList.find(p => p.title == "Filters");
        this.clickSegmentEvent.emit(tab);
    }

    onClickFanSegment(event: any) {
        let tab: global.TabItem;
        tab = global.CurrentUnit.tabList.find(p => p.title == "Fan");
        this.clickSegmentEvent.emit(tab);
    }

    onClickCoilSegment(event: any) {
        let tab: global.TabItem;
        tab = global.CurrentUnit.tabList.find(p => p.title == "Coil");
    this.clickSegmentEvent.emit(tab);
    }

}