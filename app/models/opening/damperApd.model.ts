export class DamperApdRequestModel {
    AirVolumeCFM: number;
    DamperProduct: string;
    DamperBladeQuantity: number;
    DamperHeight: number;
    DamperWidth: number;
    FaceDamperHeight: number;
    BypassDamperHeight: number;

    constructor() {
        {
            this.AirVolumeCFM = null;
            this.DamperProduct = null;
            this.DamperBladeQuantity = null;
            this.DamperHeight = null;
            this.DamperWidth = null;
            this.FaceDamperHeight = null;
            this.BypassDamperHeight = null
        }
    }
}


export class DamperApdResponseModel {
    Errors: any;
    DamperAirPressureDropInwg: number;
    FaceDamperAirPressureDropInwg: number;
    BypassDamperAirPressureDropInwg: number;

    constructor() { }
}
