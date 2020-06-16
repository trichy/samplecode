import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { CookieModule } from "ngx-cookie";

import { UnitGeneratorModule } from "@jci-ahu/ui.ahu.unit-generator";
import { GridLayoutModule } from "@jci-ahu/ui.shared.grid-layout";
import { DescriptorComboBoxModule } from "@jci-ahu/ui.ahu.descriptor-comboboxes";
import { Viewer3DModule } from "@jci-ahu/ui.shared.viewer3d";
import { PropertyGridModule } from "@jci-ahu/ui.shared.property-grid";

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { CustomerPreferencesComponent } from './components/customer-preferences/customer-preferences.component';
import { SpecificationComponent } from './components/specification/specification.component';
import { UnitSelectionComponent } from './components/unit-selection/unit-selection.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UnitSummaryComponent } from './components/unit-summary/unit-summary.component';
import { CustomerPreferencesCategoriesComponent } from './components/customer-preferences-categories/customer-preferences-categories.component';
import { CustomerPreferencesChangeComponent } from './components/customer-preferences-change/customer-preferences-change.component';
import { CustomerPreferencesSaveComponent } from './components/customer-preferences-save/customer-preferences-save.component';
import { CustomerPreferencesToolBarComponent } from './components/customer-preferences-toolbar/customer-preferences-toolbar.component';
import { SharedUIModule } from './shared/sharedui.module';
import { SetupComponent } from './components/setup/setup.component';
import { WorkingUnitLabelComponent } from "./components/setup/working-unit-label/working-unit-label.component";
import { DebugComponent } from './components/debug/debug.component';
import { FanRatingService } from './shared/services/fan-rating.service';
import { ServicesModule } from './shared/services/services.module';
import { SampleService } from './services/sample.service';
import { ToastrService } from './common/toastr/toastr.service';
import { UnitConfigurationFiltersService } from './services/unit-configuration-filters.service';
//import { CabinetService } from './services/cabinet.service';
import { ShellService } from './core/shellServices/shell.service';
import { UnitConfigurationSaveComponent } from './components/unit-configuration-save/unit-configuration-save.component';
import { UnitConfigurationService } from './core/unit-configuration/unitConfiguration.service';
import { SessionTokenService } from './core/util/sessionToken.service';
import { SessionDataListService } from './core/session-data-list/session-data-list.service';
import { AddFlatFilterUnitService } from './core/flat-filter-unit/add-flat-filter.service';
import { AddFlatFilterDirective } from './core/flat-filter-unit/add-flat-fliter-unit.directive';

import * as UnitConfiguration from "./components/unit-configuration";
import { UnitConfigurationModule } from "./components/unit-configuration/unit-configuration.module";

import { DescriptorStoreConnectorService } from "@jci-ahu/services.data-access";
import { TOKEN_IDescriptorSourceConnector } from "@jci-ahu/data.shared.descriptors.interfaces";

import { DescriptorStoreAHUModule } from "@jci-ahu/data.ahu.descriptor-store";
import { DescriptorStoreCoilModule } from "@jci-ahu/data.coil.descriptor-store";
import { DescriptorStoreCommonModule } from "@jci-ahu/data.common.descriptor-store";

import { ModelFactoryAHUModule } from "@jci-ahu/data.ahu.model-factory";
import { ModelFactoryCoilModule } from "@jci-ahu/data.coil.model-factory";
import { ModelFactoryCommonModule } from "@jci-ahu/data.common.model-factory";
import { ProjectSettingService } from './core/project-settings/project-settings.service';
import { DirectiveModule } from './shared/directives/directive.module';

import { SegmentValidationService } from './core/segment-validation/segment-validation.service';
import { ReturnEstimateComponent } from './components/return-estimate/return-estimate.component';
import { SegmentFactoryService } from './core/util/SegmentFactoryService';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CustomerPreferencesComponent,
        SpecificationComponent,
        UnitSelectionComponent,
        MessagesComponent,
        UnitSummaryComponent,
        CustomerPreferencesCategoriesComponent,
        CustomerPreferencesChangeComponent,
        CustomerPreferencesSaveComponent,
        CustomerPreferencesToolBarComponent,
        SetupComponent,
        WorkingUnitLabelComponent,
        DebugComponent,
		UnitConfigurationSaveComponent,
        AddFlatFilterDirective,
        ReturnEstimateComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule,
        JsonpModule,
        FormsModule,
        SharedUIModule,
        ServicesModule,      
        UnitGeneratorModule,
        GridLayoutModule,
        DescriptorComboBoxModule,
        UnitConfigurationModule,
        Viewer3DModule,
        PropertyGridModule,
        CookieModule.forRoot(),
        DescriptorStoreAHUModule,
        DescriptorStoreCoilModule,
        DescriptorStoreCommonModule,
        ModelFactoryAHUModule,
        ModelFactoryCoilModule,
        ModelFactoryCommonModule,
        DirectiveModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'setup', pathMatch: 'full' },
            { path: 'setup', component: SetupComponent, data: { animation: 'setup' } },
            { path: 'debug', component: DebugComponent, data: { animation: 'debug' } },
            { path: 'customer-preferences', component: CustomerPreferencesComponent, data: { animation: 'customer-preferences' } },
            { path: 'specification', component: SpecificationComponent, data: { animation: 'specification' } },
            { path: 'unit-selection', component: UnitSelectionComponent, data: { animation: 'unit-selection' } },
            { path: 'unit-configuration', component: UnitConfiguration.UnitConfigurationComponent },
            { path: 'messages', component: MessagesComponent, data: { animation: 'messages' } },
            { path: 'unit-summary', component: UnitSummaryComponent, data: { animation: 'unit-summary' } },
            { path: '**', redirectTo: 'setup' }
        ], {useHash: true})
    ],
    providers: [
        UnitSelectionComponent,
        ToastrService,
        FanRatingService,
        SampleService,
        UnitConfigurationFiltersService,
      //  CabinetService,
        ShellService,
        UnitConfigurationService,
        SessionTokenService,
        SessionDataListService,
        AddFlatFilterUnitService,
        ProjectSettingService,
        SegmentValidationService,
        SegmentFactoryService,
        { provide: "BASE_APP_API_URL", useFactory: getAppAPIUrl },
        { provide: "BASE_FILTER_API_URL", useFactory: getFilterAPIUrl },
        { provide: "ESTIMATED_API_URL", useFactory: getEstimatedURL },
        { provide: "SEL_NAV_SESSION_API_URL", useFactory: getSelNavSessionURL },
        { provide: "SESSION_TOKEN_ID", useFactory: getSessionToken },
        { provide: "BASE_APP_URL", useFactory: getAppBaseUrl },
        { provide: "COMMON_API_URL", useFactory: getCommonUrl },
        { provide: "MIXING_SEGMENT_API_URL", useFactory: getMixingSegmentUrl },
        { provide: "OPENING_API_URL", useFactory: getOpeningAPIUrl },
        { provide: "SHOW_CUSTOMER_PREFERENCES", useFactory: getShowCustomerPreferencesValue},
        { provide: "BASE_SHELL_API_URL", useFactory: getShellServiceAPIUrl },
        {
            provide: TOKEN_IDescriptorSourceConnector,
            useClass: DescriptorStoreConnectorService
        }
    ]
})
export class AppModuleShared {
}

export function getAppAPIUrl()
{
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('websiteAPIBaseUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getFilterAPIUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('filterServiceApiBaseUri');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getEstimatedURL() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('estimatedApiBaseUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getSessionToken() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('sessionTokenId');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getSelNavSessionURL() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('selNavSessionUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getAppBaseUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('websiteBaseUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getCommonUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('commonApiBaseUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getShellServiceAPIUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('shellServicesApiBaseUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getMixingSegmentUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('mixingSegmentUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getOpeningAPIUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('openingServiceUrl');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function getShowCustomerPreferencesValue() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('showCustomerPreferences');
    if (objHidden != null) return objHidden.value;
    return "";
}


