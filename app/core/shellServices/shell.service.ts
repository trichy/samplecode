import { Injectable, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TunnelSelectionRequestModel } from "../../models/ShellServicesModel/mock_tunnelSelectionRequestModel";
import { TunnelSelectionResponseModel } from "../../models/ShellServicesModel/mock_tunnelSelectionResponseModel";
import { CabinetSizeRequestModel } from "../../models/ShellServicesModel/mock_cabinetSizeRequestModel";
import { CabinetSizeResponseModel } from "../../models/ShellServicesModel/mock_cabinetSizeResponseModel";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ShellService {
    private _headers: Headers;
    private _tunnelSelectionUrl: string;
    private _cabinetSizeUrl: string;

    @Output() cabinetOptionsChange: EventEmitter<any> = new EventEmitter();

    constructor(private _http: Http,
        @Inject("BASE_SHELL_API_URL") baseUrl: string) {
        this._tunnelSelectionUrl = baseUrl + "api/shell/selection";
        this._cabinetSizeUrl = baseUrl + "/api/shell/cabinetsize";
    }

    onCabinetOptionsChange() {
        this.cabinetOptionsChange.emit(true);
    }

    getTunnelSelection(tunnelModel: TunnelSelectionRequestModel): Observable<TunnelSelectionResponseModel> {
        //debugger;
        let options = this.getRequestOtion();
        return this._http.post(this._tunnelSelectionUrl, JSON.stringify(tunnelModel), options)
            .pipe(map(res => <TunnelSelectionResponseModel>res.json()))
            .pipe(catchError(this.handleError));
    }

    getTunnelSelectionPromise(tunnelModel: TunnelSelectionRequestModel): Promise<TunnelSelectionResponseModel> {
        //debugger;
        let options = this.getRequestOtion();
        return this._http.post(this._tunnelSelectionUrl, JSON.stringify(tunnelModel), options)
            .pipe(map(res => res.json())).toPromise()
            .catch(this.handlePromiseError);
    }

    getCabinetSelection(cabinetModel: CabinetSizeRequestModel): any {
        //debugger;
        let options = this.getRequestOtion();
        return this._http.post(this._cabinetSizeUrl, JSON.stringify(cabinetModel), options)
            .pipe(map(res => <CabinetSizeResponseModel>res.json()))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private handlePromiseError(error: Response) {
        throw (error.json().error || 'An error occurred while communicating with the API');
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