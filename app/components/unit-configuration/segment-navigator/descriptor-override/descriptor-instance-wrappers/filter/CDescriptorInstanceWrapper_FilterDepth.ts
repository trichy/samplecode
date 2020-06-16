import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_FilterDepth extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterDepth)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get filterDepthInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterDepth
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterDepth;
    }
    public get descriptorValueString(): string
    {
        return this._storeAHU.Filter.FilterDepth.uiDescription(this.filterDepthInstance.enum);
    }
}