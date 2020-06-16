import { Injectable, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
import { httpFactory } from '@angular/platform-server/src/http';
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { SessionTokenService } from '../util/sessionToken.service';
import { PreferencesDataListResponse } from '../../models/project-settings/preferences-data-list-response.model';
//import { InheritDefinitionFeature } from '@angular/core/src/render3/features/inherit_definition_feature';


@Injectable()
export class ProjectSettingService {
    private _baseUrl: string;
    private _sessionTokenId: string;

    constructor(
        private _http: Http,
        @Inject('SESSION_TOKEN_ID') sessionTokenId: string,
        @Inject('COMMON_API_URL') commonBaseUrl: string
    ) {

        this._baseUrl = commonBaseUrl;
        this._sessionTokenId = sessionTokenId;

        if (sessionTokenId == '')
            this._sessionTokenId = localStorage.getItem('sessionTokenId');

        console.log(commonBaseUrl);

    }

    public getProjectSettingsService(projectGuid: string): Observable<PreferencesDataListResponse> {

        // TODO: better URI naming construction
        let url = this._baseUrl + 'api/Preference/Preferences';
        let body = this.getRequestBody(projectGuid);
        return this._http.post(url, body)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'An error occurred while communicating with the API');
    }

    private extractData(resp: Response) {
        let body = resp.json();
        console.log(body);
        return body || {};
    }

    private getRequestBody(projectGuid: string): any {
        let body = {
            sessionGuid: this._sessionTokenId,
            projectGuid: projectGuid,
            nameSpace: 'SelectionNavigator.AHU.General.Filters'
        }
        return body;
    }


}