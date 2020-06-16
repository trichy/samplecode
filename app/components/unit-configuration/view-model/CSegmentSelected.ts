import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces"; 
import { Guid } from "@jci-ahu/shared.guid/lib";
import { CAirPath_ViewModel } from "../../unit-configuration/view-model/CAirPath_ViewModel";

export class CSegmentSelected {

    private static _list: Array<ModelAHU.Configuration.Segments.ISegment> = new Array<ModelAHU.Configuration.Segments.ISegment>();
    private static _segmentSelected: ModelAHU.Configuration.Segments.ISegment = null;
    private static _segmentMouseOver: ModelAHU.Configuration.Segments.ISegment = null;
    private static _segmentMouseOverBack: ModelAHU.Configuration.Segments.ISegment = null;
    private static _airPathSelected: CAirPath_ViewModel;

    private static GetLastSegmentSelected(): ModelAHU.Configuration.Segments.ISegment {
        let segment: ModelAHU.Configuration.Segments.ISegment = null;
        if (this._list.length) {
            segment = this._list[0];
        }
        return segment;
    }


    public static set segmentMouseOver(value: ModelAHU.Configuration.Segments.ISegment) {
        if (value === null) {
            this._segmentMouseOverBack = this._segmentMouseOver;
        }
        this._segmentMouseOver = value;
    }

    public static get segmentMouseOver(): ModelAHU.Configuration.Segments.ISegment {
        return this._segmentMouseOverBack;
    }

    public static get segmentSelected(): ModelAHU.Configuration.Segments.ISegment {    
        if (this._list.length) {
            this._segmentSelected = this._list[this._list.length - 1];
        }
        else {
            this._segmentSelected = null;
        }
        return this._segmentSelected;   
    }

    public static AddSegment(segment: ModelAHU.Configuration.Segments.ISegment): void {
        this._list.push(segment);
    }

    public static RemoveSegment(segment: ModelAHU.Configuration.Segments.ISegment): void {
        this._list.forEach((item, index) => {
            if (item === segment) this._list.splice(index, 1);
        });
    }

    public static ShowSegments(): void {
        this._list.forEach((item, index) => {
            console.log(item);
        });
    }

    public static resetSegmentMouseOver(): void {
        this._segmentMouseOverBack = null;
        this._segmentMouseOver = null;
    }

    public static Dispose() {
        this._segmentSelected = null;
       // this._airPathSelected = null;
        this._list = new Array<ModelAHU.Configuration.Segments.ISegment>();
    }


    public static set AirPathSelected(value: CAirPath_ViewModel) {
        this._airPathSelected = value;
    }

    public static get AirPathSelected(): CAirPath_ViewModel {
        return this._airPathSelected;
    }
}