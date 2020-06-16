import { Injectable, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { httpFactory } from '@angular/platform-server/src/http';
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { SegmentCoreLengthRequestModel, SegmentCoreLengthResponseModel } from '../../models/mixing-segment/segmentCoreLength.model';
import { SegmentApdRequestModel, SegmentApdResponseModel, SegmentWeightRequestModel, SegmentWeightResponseModel } from '../../models/mixing-segment';


@Injectable()
export class SegmentValidationService {
    private _baseUrl: string;

    constructor(private http: Http,
        @Inject("MIXING_SEGMENT_API_URL") mixingUrl: string) {
        this._baseUrl = mixingUrl;
    }

    public getSegmentCoreLenght(reqParams: SegmentCoreLengthRequestModel): Observable<any> {
        //let body = {
        //    "ProductType": "SolutionXT",
        //    "UnitType": "Indoor",
        //    "SegmentType": "IP",
        //    "TopOpeningShape": "Rectangle",
        //    "TopOpeningHeight": 21,
        //    "TopOpeningDamper": true,
        //    "BottomOpeningShape": "Rectangle",
        //    "BottomOpeningDamper": false,
        //    "BottomOpeningHeight": 0,
        //    "LeftOpeningShape": "Rectangle",
        //    "LeftOpeningDamper": true,
        //    "LeftOpeningWidth": 32.5,
        //    "RightOpeningShape": "Rectangle",
        //    "RightOpeningDamper": false,
        //    "RightOpeningWidth": 0,
        //    "HasAcoustiweir": false
        //}
        let url = this._baseUrl + 'api/mixingsegment/corelength';
        let options = this.getRequestOtion();
        return this.http.post(url, reqParams, options)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    public getSegmentWeight(): Observable<any> {
        let body =
        {
            "FrontPanel_DoorWeight": 100,
            "FrontPanel_HoodWeight": 0,
            "FrontPanel_LouverWeight": 0,
            "FrontPanel_DamperWeight": 0,
            "FrontPanel_AcoustiweirWeight": 0,
            "FrontPanel_SafetyScreenWeight": 0,
            "FrontPanel_WalkonGrateWeight": 0,
            "RearPanel_DoorWeight": 0,
            "RearPanel_HoodWeight": 0,
            "RearPanel_LouverWeight": 0,
            "RearPanel_DamperWeight": 0,
            "RearPanel_AcoustiweirWeight": 0,
            "RearPanel_SafetyScreenWeight": 0,
            "RearPanel_WalkonGrateWeight": 0,
            "RightPanel_DoorWeight": 0,
            "RightPanel_HoodWeight": 0,
            "RightPanel_LouverWeight": 0,
            "RightPanel_DamperWeight": 0,
            "RightPanel_AcoustiweirWeight": 0,
            "RightPanel_SafetyScreenWeight": 0,
            "RightPanel_WalkonGrateWeight": 0,
            "LeftPanel_DoorWeight": 0,
            "LeftPanel_HoodWeight": 0,
            "LeftPanel_LouverWeight": 0,
            "LeftPanel_DamperWeight": 0,
            "LeftPanel_AcoustiweirWeight": 0,
            "LeftPanel_SafetyScreenWeight": 0,
            "LeftPanel_WalkonGrateWeight": 0,
            "TopPanel_DoorWeight": 0,
            "TopPanel_HoodWeight": 0,
            "TopPanel_LouverWeight": 0,
            "TopPanel_DamperWeight": 0,
            "TopPanel_AcoustiweirWeight": 0,
            "TopPanel_SafetyScreenWeight": 0,
            "TopPanel_WalkonGrateWeight": 0,
            "BottomPanel_DoorWeight": 0,
            "BottomPanel_HoodWeight": 0,
            "BottomPanel_LouverWeight": 0,
            "BottomPanel_DamperWeight": 0,
            "BottomPanel_AcoustiweirWeight": 0,
            "BottomPanel_SafetyScreenWeight": 0,
            "BottomPanel_WalkonGrateWeight": 0
        };

        let url = this._baseUrl + 'api/mixingsegment/weight';
        let options = this.getRequestOtion();
        return this.http.post(url, body, options)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    public segmentAPD(segmentApdRequest: SegmentApdRequestModel): Promise<SegmentApdResponseModel> {
        let url = `${this._baseUrl}api/mixingsegment/apd`;
        let options = this.getRequestOtion();
        return this.http.post(url, segmentApdRequest, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    public segmentWeight(segmentWeightRequest: SegmentWeightRequestModel): Promise<SegmentWeightResponseModel> {
        let url = `${this._baseUrl}api/mixingsegment/weight`;
        let options = this.getRequestOtion();
        return this.http.post(url, segmentWeightRequest, options)
            .pipe(map(this.extractData)).toPromise()
            .catch(this.handlePromiseError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private handlePromiseError(error: Response) {
        throw (error.json().error || 'An error occurred while communicating with the API');
    }

    private extractData(resp: Response) {
        let body = resp.json();
        return body || {};
    }

    private getRequestOtion(): RequestOptions {
        let _headers = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
        });
        let options = new RequestOptions({
            headers: _headers
        });
        return options;
    }

}