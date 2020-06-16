export class OpeningApdRequestModel {

    OpeningShape: string;
    AirVolumeCFM: number;
    OpeningHeight: number;
    OpeningWidth: number;
    KValue: number;

    constructor() {
        this.OpeningShape = null;
        this.AirVolumeCFM = null;
        this.OpeningHeight = null;
        this.OpeningWidth = null;
        this.KValue = null
    }

}

export class OpeningApdResponseModel {

    Errors: any;
    OpeningAPDInWg: number;

    constructor() { }
}