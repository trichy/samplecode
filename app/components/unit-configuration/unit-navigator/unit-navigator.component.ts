import {
    Component, Input, ViewContainerRef, ComponentFactoryResolver, QueryList, ViewChildren, OnInit,
    ComponentRef, ComponentFactory, Output, EventEmitter
} from "@angular/core";
import { Inject } from "@angular/core";

import { Subscription } from "rxjs";
import { CUnit_ViewModel } from "../view-model/CUnit_ViewModel";
import { CSegment_ViewModel } from "../view-model/CSegment_ViewModel";
import { SegmentTypeHostDirective } from "../segment-navigator/segment-types/segment-type-host.directive";
import { Configuration } from "@jci-ahu/data.ahu.model";
import { debounce } from "rxjs/internal/operators/debounce";
import { debug } from "util";
import { CAirPath_ViewModel } from "../view-model/CAirPath_ViewModel";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as SegmentTypes from "../segment-navigator/segment-types";
import { CSegmentSelected } from "../view-model/CSegmentSelected";
import { TagContentType } from "@angular/compiler";

import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { forEach } from "@angular/router/src/utils/collection";
import { type } from "os";
@Component
    ({
        selector: "unit-navigator",
        templateUrl: "./unit-navigator.component.html",
        styleUrls:
            [
                "./unit-navigator.component.css"
            ]
    })
export class UnitNavigatorComponent implements OnInit {

    @Input("unit")
    
    _unit: CUnit_ViewModel = null;
    _selectedPath: CAirPath_ViewModel;
    _selectedSegment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;
    tabSelected: number = 1;
    showModal = false;
    tabSummarySelected: number = 1;
    selectedSegmentRef: any;
    selectedSegmentName: string;
    selectedSegmentSuffix: number;
    
    @ViewChildren(SegmentTypeHostDirective)
    _segmentTypeHostList: QueryList<SegmentTypeHostDirective> = null;

    private _changeSubscription: Subscription = null;
    private _showFilterOptionSummary: boolean = true;

    @Output() deleteSegment: EventEmitter<any> = new EventEmitter();

    tabView: string = "0";

    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) _descriptorStoreAHU: IDescriptorStoreAHU,
        private _componentResolver: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        this.selectDefaultTunel();
    }



    ngDoCheck() {
        this.activateSelectedMenu();
    }
    public activateSelectedMenu(): void {

        let segmentSelected = CSegmentSelected.segmentSelected;
        if (segmentSelected === null) {
            this._selectedSegment = null;
            this._selectedPath = null;
        }
        if (this._selectedSegment !== segmentSelected) {
            if (this._unit) {
                this._unit.airPathList.forEach((airpath, i) => {
                    airpath.segmentList.forEach((segment, x) => {
                        if (segment.model.id.equals(segmentSelected.id)) {
                            this._selectedPath = airpath;
                            this._selectedSegment = segmentSelected;
                            
                        }
                    })
                });
            }
        }

        // Enable Filter option Tab in Summary
        if (this._unit.segmentList && this._unit.segmentList.length > 0) {
            let selectedSegments = this._unit.segmentList.filter(segments => segments.isSelected === true);
            let filterSegments = selectedSegments.filter(segment => {
                if (segment.model['config_Filter']) {
                    return segment;
                }
            });
            selectedSegments.length == filterSegments.length ?
                (this._showFilterOptionSummary = false) :
                ((this.tabSummarySelected == 4) ? (this.selectedSummaryTab(1), this._showFilterOptionSummary = true) : this._showFilterOptionSummary = true);
        }
    }

    selectedTab(tabNumber: number): void {
        this.tabSelected = tabNumber;
        if (this._selectedPath.segmentList.length > 0) {
            let segment = this._selectedPath.segmentList[tabNumber].model;
            CSegmentSelected.RemoveSegment(segment);
            CSegmentSelected.AddSegment(segment);

            let id = this._selectedPath.segmentList[tabNumber].model.id.toString().toLowerCase();
            let el = document.getElementById("segment_" + id);
            if (el) {
                el.scrollIntoView(false);
            }
        }
    }

    selectedSummaryTab(tabIndex: number) {
        this.tabSummarySelected = tabIndex;

    }

    private selectDefaultTunel(): void {

        let airPath: CAirPath_ViewModel;
        if (this._unit) {            
            if (this._unit.airPathList.length > 0) {
                airPath = this._unit.airPathList[0];
                this._selectedPath = airPath;
                airPath.isOpenInTunnelNavigator = true;
            }
        }
    }

    private tabChange(e) {
        this.tabView = e.target.value;
    }

    private summaryEnable() {
        let counter = 0;

        this._unit.segmentList.forEach((segment) => {

            if (segment.isSelected) {
                counter++;
            }
        });

        if (counter > 1) {
            return false;
        } else {
            this.tabView = "0";
            return true;
        }
    }

    public deleteSelectedSegment(selectedSegment): void {
        this.showModal = true;
        this.selectedSegmentRef = selectedSegment;

        this.selectedSegmentName = this.selectedSegmentRef._segmentType;

        this.selectedSegmentSuffix = this.selectedSegmentRef._segmentTypeSuffix;

        
        //this.deleteSegment.emit(selectedSegment);
        //this.selectedTab(0);
    }

    public deleteSegmentContinue(): void {
        this.deleteSegment.emit(this.selectedSegmentRef);
        this.showModal = false;
        this.selectedTab(0);
        
    }
    public deleteSegmentCancel() {
        this.showModal = false;
    }
    
}