export class SafetyCoverApdRequestModel {
    AirVolumeCFM: number;
    SafetyScreenType: string;
    OpeningShape: string;
    OpeningHeight: number;
    OpeningWidth: number;

    constructor() {
        this.AirVolumeCFM = null;
        this.SafetyScreenType = null;
        this.OpeningShape = null;
        this.OpeningHeight = null;
        this.OpeningWidth = null
    }
}

export class SafetyCoverApdResponseModel {
    Errors: any;
    SafetyCoverAPDInWg: number;

    constructor() { }
}
