export class DamperSizeRequestModel {
    ProductType: string;
    TunnelHeight: number;
    TunnelWidth: number;
    TargetFaceArea: number;
    DamperProduct: string;
    DamperBladeOrientation: string;
    DamperConfiguration: string;
    DamperBladeDirection: string;
    DamperFlangeMountType: string;
    OpeningLocation: string;

    constructor() {
        this.ProductType = null;
        this.TunnelHeight = null;
        this.TunnelWidth = null;
        this.TargetFaceArea = null;
        this.DamperProduct = null;
        this.DamperBladeOrientation = null;
        this.DamperConfiguration = null;
        this.DamperBladeDirection = null;
        this.DamperFlangeMountType = null;
        this.OpeningLocation = null
    }
}

export class DamperSizeResponseModel {
    Errors: any;
    LeftDamper_SizeH: number;
    LeftDamper_SizeW: number;
    RightDamper_SizeH: number;
    RightDamper_SizeW: number;
    TopDamper_SizeH: number;
    TopDamper_SizeW: number;
    BottomDamper_SizeH: number;
    BottomDamper_SizeW: number;
    FrontDamper_SizeH: number;
    FrontDamper_SizeW: number;
    RearDamper_SizeH: number;
    RearDamper_SizeW: number;

    constructor() { }
}