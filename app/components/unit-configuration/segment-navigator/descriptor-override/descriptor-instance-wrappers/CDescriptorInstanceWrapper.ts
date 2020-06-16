import * as ModelInterfacesCommon from "@jci-ahu/data.common.model.interfaces";

export abstract class CDescriptorInstanceWrapper
{
    private _instanceName: string = "";
    private _original: ModelInterfacesCommon.Types.IDescriptorInstance = null;

    protected _working: ModelInterfacesCommon.Types.IDescriptorInstance = null;

    constructor(
        instanceName: string,
        data: ModelInterfacesCommon.Types.IDescriptorInstance)
    {
        this._instanceName = instanceName;
        this._original = data;
        this._working = this._original.clone(false) as ModelInterfacesCommon.Types.IDescriptorInstance;        
    }

    public get id(): string
    {
        return this._working.id.toString();
    }

    public get instanceName(): string
    {
        return this._instanceName;
    }

    public get hasOverride(): boolean
    {
        return this._working.hasOverride;
    }
    public set hasOverride(value: boolean)
    {
        this._working.hasOverride = value;
    }

    public get overrideValue(): string
    {
        return this._working.overrideValue;
    }
    public set overrideValue(value: string)
    {
        this._working.overrideValue = value;
    }

    public get overrideWeight(): number
    {
        return this._working.overrideWeight;
    }
    public set overrideWeight(value: number)
    {
        this._working.overrideWeight = value;
    }

    public get overrideLength(): number
    {
        return this._working.overrideLength
    }
    public set overrideLength(value: number)
    {
        this._working.overrideLength = value;
    }

    public get overridePrice(): number
    {
        return this._working.overridePrice;
    }
    public set overridePrice(value: number)
    {
        this._working.overridePrice = value;
    }

    public get overrideForRelease(): boolean
    {
        return this._working.overrideForRelease;
    }
    public set overrideForRelease(value: boolean)
    {
        this._working.overrideForRelease = value;
    }

    public get overrideAttachments(): string
    {
        return "N/A";
    }

    public commit(): void
    {
        this._working.copyTo(this._original, false);
    }

    public abstract get descriptorValueString(): string;
}