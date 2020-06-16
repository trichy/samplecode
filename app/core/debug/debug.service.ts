import { Injectable, OnInit } from '@angular/core';
import { UserInformation } from '../model/userInformation'; 
import { Http, Response, Headers, RequestOptions, Jsonp} from '@angular/http'; 
//import { BehaviorSubject } from 'rxjs/BehaviorSubject'; 
import { httpFactory } from '@angular/platform-server/src/http';
import { CookieService } from "ngx-cookie";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
 

@Injectable()
export class UserInformationService implements OnInit {  
    private _baseUrl: string; 
    private _baseUrlJson: string;
          
    constructor(
        private http: Http,
        private cookieService: CookieService, private jsonp: Jsonp)
    { 
        this._baseUrl = 'https://dev.selectionnavigator.com/selnavsession/api/v1/AiolosSession/SessionDataList';   
        this._baseUrlJson = this._baseUrl;
    }

    ngOnInit(): void {
    } 

    getCookies(): void {
        console.log(this.cookieService.getAll());
    }

    getUserInformation(sessionGuid: string): Observable<any> {
        let options = new RequestOptions({ headers: null, withCredentials: true});         
        return this.http.get(`${this._baseUrl}/${sessionGuid}`, options )
            .pipe(map(this.extractData))
            .pipe(catchError(this.errorData)); 
    }

    getUserInformation2(sessionGuid: string): Observable<any> {
        //let options = new RequestOptions({ headers: null, withCredentials: true });
        //return this.http.get(`${this._baseUrl}/${sessionGuid}&callback=JSONP_CALLBACK`, options)
        //    .map(this.extractData)
        //    .catch(this.errorData);

        let apiURL = `${this._baseUrl}/${sessionGuid}&callback=JSONP_CALLBACK`
        return this.jsonp.request(apiURL)
            .pipe(map(res => {
             
            }));
    }
    
    private extractData(resp: Response) {
        let body = resp.json();
        console.log(body);
        return body || {};
    }

    private errorData(error: any) {
        console.log(error);
        return Observable.throw(error.statusText);
    }
}