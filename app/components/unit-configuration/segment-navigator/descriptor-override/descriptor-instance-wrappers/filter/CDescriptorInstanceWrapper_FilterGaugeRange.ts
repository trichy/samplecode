import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_FilterGaugeRange extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeRange)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get filterGaugeRangeInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeRange
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeRange;
    }
    public get descriptorValueString(): string
    {
        return this._storeAHU.Filter.FilterGaugeRange.uiDescription(this.filterGaugeRangeInstance.enum);
    }
}