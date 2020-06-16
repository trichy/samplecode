import { Injectable, Component, Inject } from '@angular/core';
import {
    Http,
    Request,
    RequestMethod,
    Response,
    RequestOptions,
    Headers
} from '@angular/http';
import { SampleModel } from '../models/sample.model';
//import { OptionFilter } from '../models/FilterModels';
//import { FanRatingModal } from '../models/FanRatingsModal/FanRatingModal';

import { Observable } from "rxjs"; 
import { map, catchError } from "rxjs/operators";


const ADPFakeData: string = '4.15 test';

@Injectable()
export class SampleService {

    private _headers: Headers;  

    constructor(private _http: Http) {
    }

    //getFilterDepths(apiBaseUrl: string): Observable <SampleModel[]> {

    //    let _headers = new Headers({
    //        'Content-Type': 'application/json;charset=UTF-8'
    //    });
    //    let options = new RequestOptions({
    //        headers: _headers
    //    });
        
    //    return this._http.get(apiBaseUrl + '/api/SampleData/FilterDepths', options)
    //        .pipe(map(res => <SampleModel[]>res.json()))
    //        .pipe(catchError(this.handleError));
    //} 


    //getFilterMedia(apiBaseUrl: string): Observable<FilterMediaTypeMervEfficiency[]> {
    //    let _headers = new Headers({
    //        'Content-Type': 'application/json;charset=UTF-8'
    //    });
    //    let options = new RequestOptions({
    //        headers: _headers
    //    });
    //    return this._http.get(apiBaseUrl + '/api/SampleData/FilterMediaTypeMervEfficiency', options)
    //        .map(res => <FilterMediaTypeMervEfficiency[]>res.json())
    //        .catch(this.handleError);
    //}

    //Fan Rating Service
    //getFanRatingsData(apiBaseUrl: string): Observable<FanRatingModal> {
    //    let _headers = new Headers({
    //        'Content-Type': 'application/json;charset=UTF-8'
    //    });
    //    let options = new RequestOptions({
    //        headers: _headers
    //    });
    //    return this._http.get(apiBaseUrl + '/api/SampleData/getFanRatingData', options)
    //        .pipe(map(res => <FanRatingModal>res.json()))
    //        .pipe(catchError(this.handleError));
    //}


    //getOptionFilter(apiBaseUrl: string): Observable<OptionFilter> {
    //    let _headers = new Headers({
    //        'Content-Type': 'application/json;charset=UTF-8'
    //    });
    //    let options = new RequestOptions({
    //        headers: _headers
    //    });
    //    return this._http.get(apiBaseUrl + '/api/SampleData/OptionFilter', options)
    //        .pipe(map(res => <OptionFilter>res.json()))
    //        .pipe(catchError(this.handleError));
    //}

 



    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }   
}

