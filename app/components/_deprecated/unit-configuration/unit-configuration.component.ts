import { Component, OnInit, ViewChild, Inject, OnDestroy, ElementRef } from '@angular/core';
import { unitConfiguration } from '../../core/model/unitConfiguration';
import { UnitConfigurationService } from '../../core/unit-configuration/unitConfiguration.service';
import { UnitConfigurationFiltersComponent } from '../unit-configuration-filters/unit-configuration-filters.component';
import { Unit3DConfiguratorComponent } from '../unit-3D-configurator/unit-3D-configurator.component';
import { ToastrService } from '../../common/toastr/toastr.service';
import { AddFlatFilterUnitService } from '../../core/flat-filter-unit/add-flat-filter.service';
import { AddFlatFilterUnit } from '../../models/flat-filter-unit/add-flat-filter-unit.model';
import { WorkingDataService } from "../../services/working-data.service";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelAHU from "@jci-ahu/data.ahu.model";
import { FlatFilterUnitContainerComponent } from '../flat-filter-unit-container/flat-filter-unit-container.component';
import { ModelAccessAHUService } from "@jci-ahu/services.ahu.model-access";

import * as global from './global';
declare var jquery: any;
declare var $: any;

declare var threeDimensionalPresenterModule: any;
@Component({
    selector: 'app-unit-configuration',
    templateUrl: './unit-configuration.component.html',
    styleUrls: ['./unit-configuration.component.css']
})

export class UnitConfigurationComponent implements OnInit, OnDestroy {
    modelConfiguration: unitConfiguration;
    baseAppUrl: string = "";
    imageUrl: string = '';
    showFlat: boolean = false;
    showModal: boolean = false;
    threeDModalInitialize: boolean = false;

    _fanOn: boolean = false;

    flatFilterUnits: AddFlatFilterUnit[] = [];
    @ViewChild(UnitConfigurationFiltersComponent) FilterDM: UnitConfigurationFiltersComponent;
    @ViewChild(Unit3DConfiguratorComponent) FilterBank: Unit3DConfiguratorComponent;
    @ViewChild(FlatFilterUnitContainerComponent) FlatFilterContainer: FlatFilterUnitContainerComponent;
    @ViewChild('leftBox') leftElementView: ElementRef;
    public rightBoxHeight: number;
    constructor(
        private unitConfigurationService: UnitConfigurationService,
        private toastrService: ToastrService,
        private _WORKING_DATA: WorkingDataService,
        private _addFilterFlatUnitService: AddFlatFilterUnitService,
        private _MODEL_ACCESS: ModelAccessAHUService,
        @Inject('BASE_APP_URL') baseUrl : string

    ) {
        this.baseAppUrl = baseUrl;
        this.imageUrl = this.baseAppUrl + "images/png/FF.png";

    }
    ngAfterContentChecked() {
        if (this.leftElementView) {
            this.rightBoxHeight = this.leftElementView.nativeElement.clientHeight;

        }
    }
    ngOnInit(): void
    {
        this.threeDModalInitialize = false;
        //
        // This is ugly, and only used for demonstration purposes, and to get model data into
        // the filter configurator for testing/development...
        // The final implementation of this should really bind the filter bank outside of this component
        // _WORKING_DATA should not be necessary at this level... 
        //

        if (this._WORKING_DATA.WorkingUnit !== null)
        {
            let segment: ModelAHU.Configuration.Segments.CSegment;
            let segment_filter: ModelAHU.Configuration.Segments.CSegment_Filter;

            segment = this._WORKING_DATA.WorkingUnit.SegmentList.find(
                i => i instanceof ModelAHU.Configuration.Segments.CSegment_Filter);

            if (segment)
            {
                segment_filter = segment as ModelAHU.Configuration.Segments.CSegment_Filter;
                if (segment_filter.Config_Filter.FilterBankList.length > 0) {
                    this.FilterDM.filterBank = segment_filter.Config_Filter.FilterBankList[0];
                }
            }
        }

        this.initConfigurationModel();
    }

    ngAfterViewInit() {

        $('#btnAddFan').click(function () {
            $('.fan-off').show();
            $('.fan-on').hide();

            //$('.airflow-r').show();
            //$('.airflow-text').show();

            $('#btnAddFan').show();
            $('#btnRemoveFan').show();

            $('#btnFanOff').hide();
            $('#btnFanOn').show();
        });

        $('#btnRemoveFan').click(function () {
            $('.fan-off').hide();
            $('.fan-on').hide();

            //$('.airflow-r').hide();
            //$('.airflow-text').hide();

            $('#btnRemoveFan').hide();
            $('#btnAddFan').show();

            $('#btnFanOff').hide();
            $('#btnFanOn').hide();

            this._fanOn = false;
        });

        //$('#btnAddCoil').click(function () {
        //    $('.coil').toggleClass('show');

        //    $('#btnAddCoil').hide();
        //    $('#btnRemoveCoil').show();
        //});

        //$('#btnRemoveCoil').click(function () {
        //    $('.coil').toggleClass('show');

        //    $('#btnRemoveCoil').hide();
        //    $('#btnAddCoil').show();
        //});

        //$('#btnAddFilter').click(function () {
        //    $('.filter').toggleClass('show');

        //    $('#btnAddFilter').hide();
        //    $('#btnRemoveFilter').show();
        //});

        //$('#btnRemoveFilter').click(function () {
        //    $('.filter').toggleClass('show');

        //    $('#btnRemoveFilter').hide();
        //    $('#btnAddFilter').show();
        //});



        $(".airflow-l").click(function () {
            if (!this._fanOn) {
                $('.fan-off').hide();
                $('.fan-on').show();
            }
            else {
                $('.fan-off').show();
                $('.fan-on').hide();
            }

            this._fanOn = !this._fanOn;
        });
    }

    addNewFlatFilter(): void {
        $('.filter').toggleClass('show');
        //this._addFilterFlatUnitService.createNewFlatFilter();
        //this.flatFilterUnits = this._addFilterFlatUnitService.getFlatFilterUnits();
        //this.FlatFilterContainer.loadFlatFilterUnit(this.flatFilterUnits);
        this.clickIcon('Filters');
    }

    addCoil(): void {
        $('.coil').toggleClass('show');

        this.clickIcon('Coil');
    }

    addFan(): void {
        let isAdd: boolean = this.clickIcon('Fan');
        if (!isAdd) {
            $('.fan-off').hide();
            $('.fan-on').hide();
        }
    }


    ngOnDestroy(): void {
        this.flatFilterUnits = [];
        this._addFilterFlatUnitService.removeFlatFiltersUnits();
    }

    async btnSaveAsClicked(itemGUID?: string) {
        let unit: ModelAHU.Configuration.Types.CUnit;
        // let setItemGuid: string = if itemGUID !='' ? itemGUID : ''; 

        console.log('ITEM GUID = ' + itemGUID);

        // unit = await this._MODEL_ACCESS.SaveUnit(this._WORKING_DATA.WorkingUnit);    
        unit = await this._MODEL_ACCESS.SaveUnit(this._WORKING_DATA.WorkingUnit, itemGUID);
    }

    private initConfigurationModel(): void {
        this.modelConfiguration = {
            filterDepth: '',
            filterMedia: '',
            maxBankH: 0,
            maxBankW: 0
        };
    }


    private showModalConfiguration() {
        //this.modelConfiguration.filterDepth = this.FilterDM.selectedFilterDepth.option3;
        //this.modelConfiguration.filterMedia = this.FilterDM.selectedFilterMedia.option4;
        this.modelConfiguration.maxBankW = this.FilterBank.tbMaxBankWidth;
        this.modelConfiguration.maxBankH = this.FilterBank.tbMaxBankHeight;
        this.showModal = true;
        this.unitConfigurationService.addConfiguration(this.modelConfiguration).subscribe(
            data => {
                localStorage.setItem('filterConfigSave', JSON.stringify(this.modelConfiguration));
            },
            error => { console.log('error ', error); this.toastrService.error(error); }
        );
    }


    menuList: Array<global.Menu> = [];

    clickSegmentImage(tabItem: global.TabItem) {
        //alert(name);
        let name = tabItem.title;
        let currMenu: global.Menu;

        this.menuList.forEach(p => p.isSelect = false);
        $('.segmentOption').removeClass('active');

        currMenu = this.menuList.find(p => p.title == name);
        if (currMenu) {
            this.menuList.forEach(p => p.isSelect = p.title == name);
        }

        $('#' + currMenu.module).addClass('in').addClass('active');
    }

    clickIcon(name: string): boolean {
        let currMenu: global.Menu;

        currMenu = this.menuList.find(p => p.title == name);
        if (currMenu) {
            if (this.menuList.length == 0 || currMenu.isSelect == true) {
                $('.segmentOption').removeClass('active');
            }
            this.menuList.splice(this.menuList.indexOf(currMenu), 1); // to confirm
            return false;
        }
        else {
            let tabItem: global.TabItem;
            tabItem = global.CurrentUnit.tabList.find(p => p.title == name);
            if (tabItem) {
                currMenu = { title: tabItem.title, module: tabItem.module, power: 'show', isSelect: false };
                if (this.menuList.length == 0) {
                    currMenu.isSelect = true;
                    $('#' + currMenu.module).addClass('in').addClass('active');
                }
                // filter bank
                if (currMenu.title == "Filters") {
                    if (!this.threeDModalInitialize) {
                        $('#btnConfigure').click(function () { threeDimensionalPresenterModule.generateView(); });
                        threeDimensionalPresenterModule.initialize();
                        this.threeDModalInitialize = true;
                    }
                }
                this.menuList.push(currMenu);
                return true;
            }
        }
        return false;
    }

    clickTabMenu(name: string) {
        this.menuList.forEach(p => p.isSelect = false);
        let currMenu: global.Menu;

        currMenu = this.menuList.find(p => p.title == name);
        if (currMenu) {
            this.menuList.forEach(p => p.isSelect = p.title == name);
        }
    }

}
