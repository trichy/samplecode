import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { igGridCfg } from '../../models/igGrid/igGridCfg.model';  

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

const congfiguration: igGridCfg = {
    primaryId: 'DataId',
    dataSource: [
        {
            "DataId": 1, "Size": "15-11", "Type": "FC", "Class": "II", "OV": "NA",
            "RPM": "2829", "MechEff": "1060", 
            "BHP": "67.8", "BHPWDrive": "3.00", 
            "WhellWidth": "4.12", "WhellDiameter": "100", 
            "MotorLocation": "Beside", "HpRatio1": "5.00/1.00", 
            "HpRatio2": "7.5/1.055", "HpRatio3": "10/1.057", 
            "HpRatio4": "15/1.147", "HpRatio5": "47.58/1.147",
            "HpRatio6": "14.25/1.147", "HpRatio7": "14.25/1.147",
            "HpRatio8": "14.25/1.147", "HpRatio9": "14.25/1.147"
        },

          {
            "DataId": 2, "Size": "15-11", "Type": "FC", "Class": "II", "OV": "NA",
            "RPM": "2829", "MechEff": "1060",
            "BHP": "67.8", "BHPWDrive": "3.00",
            "WhellWidth": "4.12", "WhellDiameter": "100",
            "MotorLocation": "Beside", "HpRatio1": "5.00/1.00",
            "HpRatio2": "7.5/1.055", "HpRatio3": "10/1.057",
            "HpRatio4": "15/1.147", "HpRatio5": "47.58/1.147",
            "HpRatio6": "14.25/1.147", "HpRatio7": "14.25/1.147",
            "HpRatio8": "14.25/1.147", "HpRatio9": "14.25/1.147"
        }
    ],
    columns: [
        { headerText: "DataId", key: "Size", dataType: "string", width: "150px", allowHiding: true, hidden: true },
        { headerText: "Size", key: "Size", dataType: "string", width: "150px" },
        { headerText: "Type", key: "Type", dataType: "string", width: "150px" },
        { headerText: "Class", key: "Class", dataType: "string", width: "150px" },
        { headerText: "OV", key: "OV", dataType: "string", width: "150px" },
        { headerText: "RPM", key: "RPM", dataType: "date", width: "150px" },
        { headerText: "Mech Eff", key: "MechEff", dataType: "string", width: "150px" },
        { headerText: "BHP", key: "BHP", dataType: "string", width: "150px" },
        { headerText: "BHP w / Drive Loss", key: "BHPWDrive", dataType: "string", width: "150px" },
        { headerText: "% Whell Width", key: "WhellWidth", dataType: "string", width: "150px" },
        { headerText: "% Whell Diameter", key: "WhellDiameter", dataType: "string", width: "150px" },
        { headerText: "Motor Location", key: "MotorLocation", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio1", key: "HpRatio1", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio2", key: "HpRatio2", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio3", key: "HpRatio3", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio4", key: "HpRatio4", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio5", key: "HpRatio5", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio6", key: "HpRatio6", dataType: "string", width: "150px" }, 
        { headerText: "Hp / $Ratio7", key: "HpRatio7", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio8", key: "HpRatio8", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio9", key: "HpRatio9", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio18", key: "HpRatio18", dataType: "string", width: "150px" },
        { headerText: "Hp / $Ratio92", key: "HpRatio92", dataType: "string", width: "150px" }
    ],
    show: true
};

@Injectable()
export class FanGridService {

    private _baseUrl: string;

    constructor(private http: Http) { }
  
    getFanGridData(): Observable<igGridCfg> {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' }),
            withCredentials: false
        });
        return this.http.get(`${this._baseUrl}`, options)
            .pipe(map(this.extractData))
            .pipe(catchError(this.errorData));
    }

    getFanGridDataTest(): Observable<igGridCfg> {
        return of(congfiguration);
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