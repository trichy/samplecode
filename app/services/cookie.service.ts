import { Injectable, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'; 

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class DevCookieService {

    private urlCookieApi: string;

    constructor(private http: Http) {//, @Inject('COOKIE_URL_API') cookieUrl: string) {
      //  this.urlCookieApi = cookieUrl;
    }

    getCookieValue(): Observable<any> {
        let options = this.getRequestOtion();
        return this.http.get(this.urlCookieApi)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    private extractData(resp: Response) {
        let body = resp.json();
        console.log(body);
        return body || {};
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