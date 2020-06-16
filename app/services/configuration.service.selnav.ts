import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";

import { IConfigurationService } from "@jci-ahu/services.shared.configuration";

@Injectable
({
    providedIn: "root"
})
export class ConfigurationServiceSelNav implements IConfigurationService
{
    constructor(
        @Inject("BASE_APP_API_URL") private _descriptorSourceAPI: string,
        @Inject("BASE_APP_API_URL") private _descriptorFilterAPI: string,
        @Inject("BASE_APP_API_URL") private _modelAccessAPI: string)
    {
    }

    public get DescriptorSourceAPI(): string
    {
        return this._descriptorSourceAPI;
    }
    public get DescriptorFilterAPI(): string
    {
        return this._descriptorFilterAPI;
    }
    public get ModelAccessAPI(): string
    {
        return this._modelAccessAPI;
    }
}