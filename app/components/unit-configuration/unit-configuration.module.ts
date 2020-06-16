import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "ngx-bootstrap";
 
import { DescriptorComboBoxModule } from "@jci-ahu/ui.ahu.descriptor-comboboxes";
import { GridLayoutModule } from "@jci-ahu/ui.shared.grid-layout";
import { SharedUIModule } from "@local/app/shared/sharedui.module";
import { Viewer3DModule } from "@jci-ahu/ui.shared.viewer3d";
import { PropertyGridModule } from "@jci-ahu/ui.shared.property-grid";

import { UnitConfigurationComponent } from "./_main/unit-configuration.component";
import { SegmentSelectorComponent } from "./segment-selector/segment-selector.component";
import { UnitNavigatorComponent } from "./unit-navigator/unit-navigator.component";
import { UnitViewerComponent } from "./unit-viewer/unit-viewer.component";
import { SegmentNavigatorComponent } from "./segment-navigator/_main/segment-navigator.component";
import { DescriptorOverrideComponent } from "./segment-navigator/descriptor-override/descriptor-override.component";
import { TunnelNavigatorComponent } from "./tunnel-navigator/tunnel-navigator.component";
import { UnitViewer3DComponent } from "./unit-viewer-3d/unit-viewer-3d.component";
import { UnitMenuComponent } from "./unit-menu/unit-menu.component";
import { FootprintMapComponent } from "./footprint-map/footprint-map.component";
import { DetailSelectorComponent } from "./detail-selector/detail-selector.component";
import { PropertiesSelectorComponent } from "./properties-selector/properties-selector.component";
import { CabinetNavigatorComponent } from "./cabinet-navigator/_main/cabinet-navigator.component";

import * as SegmentNavigator_Coil from "./segment-navigator/coil";
import * as SegmentNavigator_Common from "./segment-navigator/common";
import * as SegmentNavigator_DescriptorOverride from "./segment-navigator/descriptor-override";
import * as SegmentNavigator_Fan from "./segment-navigator/fan";
import * as SegmentNavigator_Filter from "./segment-navigator/filter";
import * as SegmentNavigator_SegmentTypes from "./segment-navigator/segment-types";
import { SegmentNavigator } from "@local/app/components/unit-configuration";
import { SummaryAccessOptionsComponent } from "./summary-navigator/common/access-options/summary-access-options.component";
import { SummaryConstructionComponent } from "./summary-navigator/common/construction/summary-construction.component";
import { SummaryFilterOptionsComponent } from './summary-navigator/filter-options/summary-filter-options.component'
import { DirectiveModule } from "../../shared/directives/directive.module";
import { ConstructionComponent } from './cabinet-navigator/construction/construction.component';
import { TunnelSelectionComponent } from "./cabinet-navigator/tunnel-selection/tunnel-selection.component";;
import { DeleteSegmentModelComponent } from './delete-segment-model/delete-segment-model.component'
import { AirpathDisplayComponent } from "./cabinet-navigator/display-airpath/airpath-display.component";

@NgModule
    ({
        declarations:
            [
                UnitConfigurationComponent,
                SegmentSelectorComponent,
                FootprintMapComponent,
                DetailSelectorComponent,
                PropertiesSelectorComponent,
                UnitNavigatorComponent,
                UnitViewerComponent,
                SegmentNavigatorComponent,
                TunnelNavigatorComponent,
                UnitViewer3DComponent,             
                UnitMenuComponent,
                SummaryAccessOptionsComponent,
                SummaryConstructionComponent,
                SummaryFilterOptionsComponent,
                CabinetNavigatorComponent,
                ConstructionComponent,
                TunnelSelectionComponent,
                AirpathDisplayComponent,
                SegmentNavigator_Coil.CoilConfigurationComponent,
                SegmentNavigator_Coil.CoilSegmentOptionsComponent,
                SegmentNavigator_Coil.CoilSelectionComponent,
                SegmentNavigator_Common.AccessOptionsComponent,
                SegmentNavigator_Common.ConstructionOverridesComponent,
                SegmentNavigator_Common.DrainPanOptionsComponent,
                SegmentNavigator_Common.LengthOptionsComponent,
                SegmentNavigator_Common.SegmentHeaderBaseComponent,
                SegmentNavigator_Common.SegmentOptionsComponent,
                SegmentNavigator_Common.OpeningOptionsComponent,
                SegmentNavigator_DescriptorOverride.DescriptorOverrideComponent,
                SegmentNavigator_Fan.FanPerformanceComponent,
				SegmentNavigator_Fan.FanSelectionComponent,
				SegmentNavigator_Fan.FanOptionComponent,
				SegmentNavigator_Fan.FanSegmentComponent,
                SegmentNavigator_Filter.FilterArrangementComponent,
                SegmentNavigator_Filter.FilterBankOptionsComponent,
                SegmentNavigator_SegmentTypes.SegmentTypeCoilComponent,
                SegmentNavigator_SegmentTypes.SegmentHeaderCoilComponent,
                SegmentNavigator_SegmentTypes.SegmentTypeFanComponent,
                SegmentNavigator_SegmentTypes.SegmentHeaderFanComponent,
                SegmentNavigator_SegmentTypes.SegmentTypeFilterComponent,
                SegmentNavigator_SegmentTypes.SegmentHeaderFilterComponent,
                SegmentNavigator_SegmentTypes.SegmentTypeGenericComponent,
                SegmentNavigator_SegmentTypes.SegmentHeaderGenericComponent,
                SegmentNavigator_SegmentTypes.SegmentTypeHostDirective,
                DeleteSegmentModelComponent
              
            ],
        imports:
            [
                AccordionModule.forRoot(),
                CommonModule,
                DescriptorComboBoxModule,
                FormsModule,
                GridLayoutModule,
                SharedUIModule,
                Viewer3DModule,
                PropertyGridModule,
                DirectiveModule
            ],
        exports:
            [
                TunnelNavigatorComponent,
                UnitViewer3DComponent 
            ],
        entryComponents:
            [
                DescriptorOverrideComponent 
            ]
    })
export class UnitConfigurationModule
{
}


