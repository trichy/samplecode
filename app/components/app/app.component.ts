import { Component, Inject, OnChanges, Injector } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
} from '@angular/animations';

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { WorkingDataService } from "@local/app/services/working-data.service";
import { SelNavService } from "@jci-ahu/services.data-access";
import { ModelAccessService } from "@jci-ahu/services.data-access";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import { ToastrService } from '../../common/toastr/toastr.service';

import { Guid } from '@jci-ahu/shared.guid';
import { CUtility } from "@jci-ahu/shared.utility";

import { CGlobals } from "@local/app/CGlobals";

import { IDescriptorSourceConnector } from "@jci-ahu/data.shared.descriptors.interfaces";
import { TOKEN_IDescriptorSourceConnector } from "@jci-ahu/data.shared.descriptors.interfaces";
import { SessionDataListService } from '../../core/session-data-list/session-data-list.service';
import { SessionDataListResponse } from '../../models/session-data-list/session-data-list-response.model';

import { ProjectSettingService } from '../../core/project-settings/project-settings.service';
import { PreferencesDataListResponse } from '../../models/project-settings/preferences-data-list-response.model';
 

declare var jquery: any;
declare var $: any;

@Component
    ({
        selector: 'app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        animations: [
            trigger('fadeAnimation', [
                transition('* => *', [
                    query(':enter',
                        [
                            style({ opacity: 0 })
                        ],
                        { optional: true }
                    ),

                    query(':leave',
                        [
                            style({ opacity: 1 }),
                            animate('0.2s', style({ opacity: 0 }))
                        ],
                        { optional: true }
                    ),

                    query(':enter',
                        [
                            style({ opacity: 0 }),
                            animate('0.2s', style({ opacity: 1 }))
                        ],
                        { optional: true }
                    )
                ])
            ])
        ]
    })
export class AppComponent implements OnChanges {
    public jQueryLoaded = false;
    public _isReady: boolean = false;
    public _projectGUID: string = '';

    constructor(
        private _router: Router,
        private _workingData: WorkingDataService,
        private _modelAccess: ModelAccessService,
        private _selNavAccess: SelNavService,
        private _toastr: ToastrService,
        private _injector: Injector,
        private _SessionDataListService: SessionDataListService,
        private _projectSettingService: ProjectSettingService,
        @Inject(TOKEN_IDescriptorSourceConnector) private _descriptorSourceConnector: IDescriptorSourceConnector,
        @Inject('SESSION_TOKEN_ID') private _sessionTokenID: string) {
        CGlobals.INJECTOR = this._injector;

        if (this._sessionTokenID) {
            localStorage.setItem('sessionTokenId', this._sessionTokenID);
        }

        _router.events.subscribe((event: Event) => {

            if (event instanceof NavigationStart) {

                if (this.jQueryLoaded) {
                    //jQuery specific stuff here
                }

                // Show loading indicator
                //setTimeout(function () { $('#loader').show(); }, 1000);
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                //$('#loader').delay(1000).fadeOut();
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });
    }

    ngOnInit() {
            this._descriptorSourceConnector.init(
            [
                "AHU",
                "Coil",
                "Common"
            ],
            "en-US").then(() => {
                this.afterInit();
            });
    }

    ngAfterViewInit() {
        if ($) {
            this.jQueryLoaded = true;
        }
    }

    ngOnChanges(): void {
        console.log(this._workingData.WorkingUnit);
    }

    private async afterInit() {
        console.log('AFTER INIT');
        if (CUtility.isNullOrWhiteSpace(this._sessionTokenID) === false) {
            console.log('Before Awaiting 1');
            this._workingData.selNavItemID = new Guid(await this._selNavAccess.GetItemID(this._sessionTokenID));

            if (this._workingData.selNavItemID.equals(Guid.empty())) {
                console.log('Before Awaiting 2');
                this._workingData.WorkingUnit = new CUnit_ViewModel(await this._modelAccess.NewUnit());
                this._router.navigate(["/setup"]);
            }
            else {
                let unit = await this._modelAccess.SelNav_GetCurrentUnit(
                    this._sessionTokenID,
                    this._workingData.selNavItemID);

                if (unit === null) {
                    unit = await this._modelAccess.NewUnit();

                    this._toastr.error("Unable To Find Unit For This Item ID - Creating New Unit Configuration");
                }

                console.log("From Session ID");
                console.log(`unit.isSelfChanged() = ${unit.isSelfChanged()}`);
                console.log(`unit.areChildrenChanged() = ${unit.areChildrenChanged()}`);
                console.log(`unit.anyChanges() = ${unit.anyChanges()}`);


                this._workingData.WorkingUnit = new CUnit_ViewModel(unit);

                this._router.navigate(["/unit-configuration"]);
            }
        }
        else {
            this._router.navigate(["/setup"]);
        }

        this._isReady = true;

        this.getProjectSettings();
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }


    private getProjectGUID(): void {

        let dataList: SessionDataListResponse = null;
        this._SessionDataListService.getSessionDataListByProgramArea('shared').subscribe(
            resp => {
                dataList = resp;
                
                if (dataList) {
                    this._projectGUID = dataList.SessionDataList[5].SessionData;                    
                }
            });
    }


    private getProjectSettingsTest() {        
        let preferences: PreferencesDataListResponse
        console.log('getProjectSettingsTest')
        if (this._projectGUID) {
            this._projectSettingService.getProjectSettingsService(this._projectGUID).subscribe(
                pref => {
                    preferences = pref;
                    console.log(preferences);
                },
                error => {
                    console.log('error ', error); this._toastr.error(error);
                }
            );
        }
    }

    private getProjectSettings() {
        console.log('getProjectSettings');
        let dataList: SessionDataListResponse = null;
        this._SessionDataListService.getSessionDataListByProgramArea('shared').subscribe(
            resp => {
                dataList = resp;
                if (dataList) {

                    let projectGuid = dataList.SessionDataList[0].SessionData;
                    console.log(dataList.SessionDataList[0]);
                    console.log("11111111")
                    this._SessionDataListService.setSessionData(dataList.SessionDataList[dataList.SessionDataList.length-1].SessionData);
                    let preferences: PreferencesDataListResponse

                    if (projectGuid) {
                        this._projectSettingService.getProjectSettingsService(projectGuid).subscribe(
                            pref => {
                                preferences = pref;
                                console.log(preferences);
                                this._workingData.Preferences = pref;
                            },
                            error => {
                                console.log('error ', error); this._toastr.error(error);
                            }
                        );

                    }
                }
            },
            error => { console.log('error ', error); this._toastr.error(error); }
        );
    }

}