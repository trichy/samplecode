import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FanRatingService } from "./fan-rating.service";
import { RestDatasource } from "./rest.datasource";

@NgModule({
    imports: [
        HttpModule
    ],    
    providers: [
        FanRatingService,
        RestDatasource,
        { provide: "FAN_RATING_API_URL", useFactory: getBaseAPIUrl }
    ] 
})
export class ServicesModule { }

export function getBaseAPIUrl() {
    let objHidden: HTMLInputElement = <HTMLInputElement>document.getElementById('fanServiceApiBaseUri');
    if (objHidden != null) return objHidden.value;
    return "";
}

export function degreeToRadian(degree: number): number{
    return Math.PI * degree / 180;
}

 