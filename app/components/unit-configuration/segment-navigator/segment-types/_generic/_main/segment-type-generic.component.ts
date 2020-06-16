import { Component, OnInit } from "@angular/core";
import { Input, Output, EventEmitter } from "@angular/core";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { E_SegmentType } from "@jci-ahu/data.ahu.enums/lib/Segment/E_SegmentType";

@Component
    ({
        selector: "segment-type-generic",
        templateUrl: "./segment-type-generic.component.html",
        styleUrls:
            [
                "./segment-type-generic.component.css"
            ]
    })
export class SegmentTypeGenericComponent implements OnInit {
    tabSelected: number = 1;

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    public showGrid: boolean = false;

    selectedTab(tabNumber: number): void {
        this.tabSelected = tabNumber;
        this.showGrid = this.tabSelected === 4;
    }

    ngOnInit(): void {
        this.showOpeningOptions();
    }


    public showOpeningOptions(): boolean {
        if (this.segment.segmentType === E_SegmentType.IP ||
            this.segment.segmentType === E_SegmentType.DP ||
            this.segment.segmentType === E_SegmentType.VP ||
            this.segment.segmentType === E_SegmentType.TN ||
            this.segment.segmentType === E_SegmentType.MB ||
            this.segment.segmentType === E_SegmentType.XA ||
            this.segment.segmentType === E_SegmentType.IO) {


            return true;
        }
        else {
            return false;
        }
    }




    public disabledOpeningOptions(): boolean {

        
        let openingLeft = this.segment.getOpeningList_Left(true, true)
            .find(i => i.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlanged ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlush ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.Standard ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.FieldCut);

        let openingRight = this.segment.getOpeningList_Right(true, true)
            .find(i => i.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlanged ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlush ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.Standard ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.FieldCut);

        if (openingLeft === undefined && openingRight === undefined) {
            return true;
        }

        return false;
    }
}