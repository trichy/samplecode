import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_FilterGaugeType extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeType)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get filterGaugeTypeInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeType
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_FilterGaugeType;
    }
    public get descriptorValueString(): string
    {
        return this._storeAHU.Filter.FilterGaugeType.uiDescription(this.filterGaugeTypeInstance.enum);
    }
}