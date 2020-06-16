//import { Injectable, OnInit, Inject, EventEmitter, Output } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { SelectionRequestModel } from '../models/cabinet/selectionRequestModel';
//import { SelectionResponseModel } from '../models/cabinet/selectionResponseModel';

//import { Observable, of } from "rxjs";
//import { map, catchError } from "rxjs/operators";

//@Injectable()
//export class CabinetService {


//    private _headers: Headers;
//    private _selectionUrl: string;

//    @Output() cabinetOptionsChange: EventEmitter<any> = new EventEmitter();

//    constructor(private _http: Http,
//        @Inject("BASE_SHELL_API_URL") baseUrl: string) {
//        this._selectionUrl = baseUrl + "api/shell/selection";
//    }

//    onCabinetOptionsChange() {
//        this.cabinetOptionsChange.emit(true);
//    }

//    getCabinetSelection(apdModel: SelectionRequestModel): Observable<SelectionResponseModel> {
//        //debugger;
//        let options = this.getRequestOtion();
//        return this._http.post(this._selectionUrl, JSON.stringify(apdModel), options)
//            .pipe(map(res => <SelectionResponseModel>res.json()))
//            .pipe(catchError(this.handleError));
//    }

//    private handleError(error: Response) {
//        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
//    }

//    private getRequestOtion(): RequestOptions {
//        let _headers = new Headers({
//            'Content-Type': 'application/json;charset=UTF-8'
//        });
//        let options = new RequestOptions({
//            headers: _headers
//        });
//        return options;
//    }
//}