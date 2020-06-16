import { Injectable, OnInit, Inject } from '@angular/core'; 
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http'; 
import { httpFactory } from '@angular/platform-server/src/http';
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { SessionTokenService } from '../util/sessionToken.service';
import { SessionDataListResponse } from '../../models/session-data-list/session-data-list-response.model';


@Injectable()
export class SessionDataListService  {
    private _baseUrl: string;
    private _sessionTokenId: string;
    private _sessionData: any;

    constructor(private http: Http,
        @Inject('SESSION_TOKEN_ID') sessionTokenId: string,
        @Inject("SEL_NAV_SESSION_API_URL") selNavUrl: string) {
        this._baseUrl = selNavUrl;
        this._sessionTokenId = sessionTokenId;
       
        if (sessionTokenId == '')
            this._sessionTokenId = localStorage.getItem('sessionTokenId');
    }
    
    getSessionDataListByProgramArea(programArea: string): Observable<SessionDataListResponse> {
        let url = this._baseUrl + 'api/v1/AiolosSession/SessionDataList/' + this._sessionTokenId + "/" + programArea;
        let options = this.getRequestOtion();
        return this.http.get(url, options)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }
    setSessionData(data) {
        //console.log('session data')
        this._sessionData = data;
    }
    getSeessionData() {
        return this._sessionData;
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private extractData(resp: Response) {
        let body = resp.json();
        //console.log(body);
        return body || {};
    }

    private getRequestOtion(): RequestOptions {
        let _headers = new Headers({
            'Content-Type': 'application/json;charset=UTF-8'//,
            //'sessionGuid': this._sessionTokenId,
            //'programArea': programArea
        });
        let options = new RequestOptions({
            headers: _headers
        });
        return options;
    }

}