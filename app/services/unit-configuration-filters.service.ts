import { Injectable, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 
import { SampleModel } from '../models/sample.model';
import { ApdRequestModel } from '../models/unit-configuration/apdrequest.model';
import { ApdResponseModel } from '../models/unit-configuration/apdResponse.model';

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class UnitConfigurationFiltersService {


    private _headers: Headers;
    private _jciUrl: string;

    constructor(private _http: Http,
        @Inject("BASE_FILTER_API_URL") baseUrl: string) {
        this._jciUrl = baseUrl + "api/filter/v1/performance";
    }
 
    calculateAPD(apdModel: ApdRequestModel): Observable<ApdResponseModel> {
        //debugger;
        let options = this.getRequestOtion();       
        return this._http.post(this._jciUrl, JSON.stringify(apdModel), options)
            .pipe(map(res => <ApdResponseModel>res.json()))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private getRequestOtion(): RequestOptions {
        let _headers = new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        });
        let options = new RequestOptions({
            headers: _headers
        });
        return options;
    }
}