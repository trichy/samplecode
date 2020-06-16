export class LouverApdRequestModel {
    ProductCode: string;
    AirVolumeCFM: number;
    LouverHeight: number;
    LouverWidth: number;

    constructor() {
        this.ProductCode = null;
        this.AirVolumeCFM = null;
        this.LouverHeight = null;
        this.LouverWidth = null
    }
}

export class LouverApdResponseModel {
    Errors: any;
    LouverAPDInWg: number;

    constructor() { }
}
