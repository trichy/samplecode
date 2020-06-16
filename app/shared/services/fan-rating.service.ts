import { NgModule, Injectable } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FanRating } from "./fan-rating.model";
import { RestDatasource } from "./rest.datasource";

import { Observable } from "rxjs";

@Injectable()
export class FanRatingService {
    constructor(private rest: RestDatasource) { }
    saveFanRating(fanRating?: FanRating): Observable<FanRating[]> {
        return this.rest.saveFanRating(fanRating);
    }
}

