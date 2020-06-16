import { Injectable, Inject } from "@angular/core";
import { Http, Request, RequestMethod, Headers, RequestOptions } from "@angular/http";
import { FanRating } from "./fan-rating.model";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class RestDatasource {
    private fanRatingAPIUrl: string;


    constructor(private http: Http, @Inject("FAN_RATING_API_URL") fanRatingAPIUrl: string) {
        this.fanRatingAPIUrl = fanRatingAPIUrl + "api/fan/v1/rate";
    }


    saveFanRating(fanRating?: FanRating): Observable<FanRating[]> {

        return this.sendRequest(RequestMethod.Post, this.fanRatingAPIUrl, [fanRating]) as Observable<FanRating[]>;
    }

    errorHandler(response: any) {
        console.log(response);
    }

    sendRequest(requestMethod: RequestMethod, url: string, body?: any): Observable<FanRating[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'Basic ' +
        //    btoa('username:password'));
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        //requestOptions.withCredentials = true; //In case of CORS

        return this.http.request(new Request({ method: requestMethod, url: url, body: body }), requestOptions)
            .pipe(map(response => response.json()));
    }
}