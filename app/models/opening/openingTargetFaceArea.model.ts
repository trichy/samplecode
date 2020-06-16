export class OpeningTargetFaceAreaRequestModel {

    AirVolumeCFM: number;
    MaxFaceVelocityFPM: number;

    constructor() {
        this.AirVolumeCFM = null;
        this.MaxFaceVelocityFPM = null;
    }

}

export class OpeningTargetFaceAreaResponseModel {

    Errors: any;
    TargetFaceArea: number;

    constructor() { }

}