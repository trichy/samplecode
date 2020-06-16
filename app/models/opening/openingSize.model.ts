export class OpeningSizeRequestModel {
    ProductType: string;
    TunnelHeight: number;
    TunnelWidth: number;
    TargetFaceArea: number;

    constructor() {
        this.ProductType = null;
        this.TunnelHeight = null;
        this.TunnelWidth = null;
        this.TargetFaceArea = null
    }
}

export class OpeningSizeResponseModel {

    Errors: any;
    Opening_LeftH: number;
    Opening_LeftW: number;
    Opening_RightH: number;
    Opening_RightW: number;
    Opening_TopH: number;
    Opening_TopW: number;
    Opening_BottomH: number;
    Opening_BottomW: number;
    Opening_FrontH: number;
    Opening_FrontW: number;
    Opening_RearH: number;
    Opening_RearW: number;

    constructor() { }
}
