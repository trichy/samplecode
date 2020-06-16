export class LouverSizeRequestModel {
    ProductType: string;
    TunnelHeight: number;
    TunnelWidth: number;
    AirVolumeCFM: number;
    MaxFreeAreaVelocity: number;
    UnitSide: string;

    constructor() {
        this.ProductType = null;
        this.TunnelHeight = null;
        this.TunnelWidth = null;
        this.AirVolumeCFM = null;
        this.MaxFreeAreaVelocity = null;
        this.UnitSide = null
    }
}

export class LouverSizeResponseModel {
    Errors: any;
    LouverHeight: number;
    LouverWidth: number;
    TargetLouverFreeArea: number;

    constructor() { }
}

