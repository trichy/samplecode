import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';

import * as ModelAHU from "@jci-ahu/data.ahu.model";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as DescriptorsAHU from "@jci-ahu/data.ahu.descriptors";

import { DescriptorStoreAHUService } from "@jci-ahu/data.ahu.descriptor-store";

@Component({
    selector: 'unit-configuration-filter-const-overrides',
    templateUrl: './unit-configuration-filter-const-overrides.component.html',
    styleUrls: ['./unit-configuration-filter-const-overrides.component.css']
})
export class FilterConstructOverridesComponent implements OnInit {

    @Input("segment")
    segment: ModelAHU.Configuration.Segments.CSegment = null;

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

}