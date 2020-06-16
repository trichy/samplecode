import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {
    OpeningApdRequestModel,
    OpeningApdResponseModel,
    OpeningSizeRequestModel,
    OpeningSizeResponseModel,
    OpeningTargetFaceAreaRequestModel,
    OpeningTargetFaceAreaResponseModel,
    LouverSizeRequestModel,
    LouverSizeResponseModel,
    LouverApdRequestModel,
    LouverApdResponseModel,
    DamperSizeRequestModel,
    DamperSizeResponseModel,
    DamperApdRequestModel,
    DamperApdResponseModel,
    SafetyCoverApdRequestModel,
    SafetyCoverApdResponseModel,
    WalkOnSafetyGrateApdRequestModel,
    WalkOnSafetyGrateApdResponseModel } from '../../models/opening';

@Injectable({
  providedIn: 'root'
})

export class OpeningService {

    private _headers: Headers;
    private _baseOpeningUrl: string;

    constructor(private _http: Http,
        @Inject("OPENING_API_URL") baseUrl: string) {
        this._baseOpeningUrl = baseUrl;
    }

    public openingApd(RequestModel: OpeningApdRequestModel): Promise<OpeningApdResponseModel> {
        let url = `${this._baseOpeningUrl}api/opening/apd`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public openingSize(RequestModel: OpeningSizeRequestModel): Promise<OpeningSizeResponseModel> {
        let url = `${this._baseOpeningUrl}api/opening/size`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public openingTargetFaceArea(RequestModel: OpeningTargetFaceAreaRequestModel): Promise<OpeningTargetFaceAreaResponseModel> {
        let url = `${this._baseOpeningUrl}api/opening/targetfacearea`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public louverApd(RequestModel: LouverApdRequestModel): Promise<LouverApdResponseModel> {
        let url = `${this._baseOpeningUrl}api/louver/apd`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public louverSize(RequestModel: LouverSizeRequestModel): Promise<LouverSizeResponseModel> {
        let url = `${this._baseOpeningUrl}api/louver/size`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public damperSize(RequestModel: DamperSizeRequestModel): Promise<DamperSizeResponseModel> {
        let url = `${this._baseOpeningUrl}api/damper/size`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public damperApd(RequestModel: DamperApdRequestModel): Promise<DamperApdResponseModel> {
        let url = `${this._baseOpeningUrl}api/damper/apd`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public safetyCoverApd(RequestModel: SafetyCoverApdRequestModel): Promise<SafetyCoverApdResponseModel> {
        let url = `${this._baseOpeningUrl}api/opening/safetycoverapd`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public walkOnSafetyGrateApd(RequestModel: WalkOnSafetyGrateApdRequestModel): Promise<WalkOnSafetyGrateApdResponseModel> {
        let url = `${this._baseOpeningUrl}api/opening/safetycoverapd`;
        let options = this.getRequestOption();
        return this._http.post(url, RequestModel, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    private handlePromiseError(error: Response) {
        throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private extractData(resp: Response) {
        let body = resp.json();
        return body || {};
    }

    private getRequestOption(): RequestOptions {
        let _headers = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
        });
        let options = new RequestOptions({
            headers: _headers
        });
        return options;
    }


}
