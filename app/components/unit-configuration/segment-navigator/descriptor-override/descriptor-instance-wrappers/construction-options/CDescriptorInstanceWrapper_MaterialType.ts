import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_MaterialType extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.ConstructionOptions.IDescriptorInstance_MaterialType)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get materialTypeInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.ConstructionOptions.IDescriptorInstance_MaterialType
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.ConstructionOptions.IDescriptorInstance_MaterialType;
    }
    public get descriptorValueString(): string
    {
        return this._storeAHU.ConstructionOptions.MaterialType.uiDescription(this.materialTypeInstance.enum);
    }
}