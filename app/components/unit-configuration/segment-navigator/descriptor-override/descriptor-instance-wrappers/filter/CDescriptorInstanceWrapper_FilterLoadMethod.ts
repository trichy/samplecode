import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_FilterLoadMethod extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterLoadMethod)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get filterLoadMethodInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterLoadMethod
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterLoadMethod;
    }
    public get descriptorValueString(): string
    {
        return this._storeAHU.Filter.FilterLoadMethod.uiDescription(this.filterLoadMethodInstance.enum);
    }
}