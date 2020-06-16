import { Injectable } from '@angular/core';

@Injectable()
export class SessionTokenService {

    private _SessionToken: string;

    public get Token(): string {
        return this._SessionToken;
    }

    public set Token(value: string)  {
        this._SessionToken = value;
    }  
}