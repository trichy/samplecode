import { Injectable, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { unitConfiguration } from '../model/unitConfiguration';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { SessionTokenService } from '../util/sessionToken.service';
import { SessionDataListService } from '../session-data-list/session-data-list.service';
import { SessionDataListResponse } from '../../models/session-data-list/session-data-list-response.model';
import { ToastrService } from '../../common/toastr/toastr.service';


@Injectable()
export class UnitConfigurationService implements OnInit {

    private _listUnits: unitConfiguration[] = [];
    private _sessionToken: string;
    private _estimatedUrl: string; 

    constructor(private http: Http,
        @Inject('ESTIMATED_API_URL') estimatedUrl: string,
        @Inject('SESSION_TOKEN_ID') sessionTokenId: string,
        private toastrService: ToastrService) {
        this._estimatedUrl = estimatedUrl + "api/v2/items";
        this._sessionToken = sessionTokenId;

        if (sessionTokenId == '')
            this._sessionToken = localStorage.getItem('sessionTokenId');
    }

    ngOnInit(): void {

    }

    get listUnits(): unitConfiguration[] {
        return this._listUnits;
    }
    @Output() selectedSegment: EventEmitter<any> = new EventEmitter();

    segmentSelected() {
        this.selectedSegment.emit("SelctionChanged");
    }

    addConfiguration(unit: unitConfiguration): Observable<unitConfiguration[]> {
        this.listUnits.push(unit);
        return of(this.listUnits);
    }

    //Added itemGUID parameter
    sendDataToEstimateGrid(parentItemGUID : string, itemGUID: string ): Observable<any> {
        let options = this.getRequestOtion();
        console.log("EstimatedURL = " + this._estimatedUrl);
        console.log(this.modelObject(parentItemGUID, itemGUID));
        console.log(options);
        return this.http.post(this._estimatedUrl, this.modelObject(parentItemGUID, itemGUID), options)
            .pipe(map(res => <any>res.json()))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw('An error occurred while communicating with the API');
    }

    private getRequestOtion(): RequestOptions {
        let _headers = new Headers({
            'Content-Type': 'application/json;charset=UTF-8',
            'SessionToken': this._sessionToken
        });
        let options = new RequestOptions({
            headers: _headers
        });
        return options;
    }

    private modelObject(parentItemGUID: string, itemGUID: string ): any {

        // itemGUID =(itemGUID === '') ? this.GUID() : itemGUID;
 
        let model = [
            {
                "Guid": itemGUID,
                "Name": "AHU Omikron",
                "Description": "Item GUID " + itemGUID,
                "ParentGuid": parentItemGUID,
                "Type": "Air Handling Unit",
                "Quantity": 1,//accept negative quantity
                "Sequence": 0, //x
                "EstimateLocation ": "All Equipment", //x
                "isActive": true,
                "isVisible": true,
                "Attributes": {
                    "Brand": "JCI",
                    "DocumentBucketId": "600",
                    "MLP": "100000",
                    "ModelNumber": "YCI-114x87x452",
                    "PricingEffectiveDate": "4/1/2018 12:00:00 AM -05:00",
                    "SaveFormatVersion": "1.0",
                    "UnitTag": "AHU-1" },
                "EstimatingAttributes": {},
                "OrderingAttributes": {},
                "Xml": {},
                "URLs": {}, //x
                "States": {},
                "References": {},
                "Notes": "This unit is for the front office",
                "EstValues": [],
                "Tags": [],
                "ConfigurationApplication" : "AHU Product Selector" 
            }
        ];
        console.log(model);
        return model;
    }

    //GUID generation function made available from other components.
    GUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}

