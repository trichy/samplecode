export class SegmentCoreLengthRequestModel {
    ProductType: string;
    UnitType: string;
    SegmentType: string;
    TopOpeningShape: string;
    TopOpeningHeight: number;
   TopOpeningDamper: boolean;
    BottomOpeningShape: string;
    BottomOpeningDamper: boolean;
    BottomOpeningHeight: number;
    LeftOpeningShape: string;
    LeftOpeningDamper: boolean;
    LeftOpeningWidth: number;
    RightOpeningShape: string;
    RightOpeningDamper: boolean;
    RightOpeningWidth: number;
    HasAcoustiweir: boolean;

    constructor() {
        this.ProductType = "SolutionXT";
        this.UnitType = "UnitType";
        this.SegmentType = "SegmentType";
        this.TopOpeningShape = "TopOpeningShape";
        this.TopOpeningHeight = 21 ;
        this.TopOpeningDamper = true;
        this.BottomOpeningShape = "BottomOpeningShape";
        this.BottomOpeningDamper = false;
        this.BottomOpeningHeight = 0;
        this.LeftOpeningShape = "LeftOpeningShape";
        this.LeftOpeningDamper = true;
        this.LeftOpeningWidth = 32.5;
        this.RightOpeningShape = "RightOpeningShape";
        this.RightOpeningDamper = false;
        this.RightOpeningWidth = 0;
        this.HasAcoustiweir = false;


    }
}

export class SegmentCoreLengthResponseModel {
    Errors: any;
    CoreLength: number;

    constructor() {

    }
}