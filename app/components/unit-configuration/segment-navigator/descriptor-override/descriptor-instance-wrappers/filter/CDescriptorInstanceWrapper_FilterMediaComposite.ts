import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as DescriptorInterfacesAHU from "@jci-ahu/data.ahu.descriptors.interfaces";

import { CDescriptorInstanceWrapper } from "../CDescriptorInstanceWrapper";
import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { CGlobals } from "@local/app/CGlobals";

export class CDescriptorInstanceWrapper_FilterMediaComposite extends CDescriptorInstanceWrapper
{
    constructor(
        instanceName: string,
        data: ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_Composite_FilterMedia_FilterMerv_FilterEfficiency,
        private _originalFilterMedia: EnumsAHU.Filter.E_FilterMediaType,
        private _originalFilterMERV: EnumsAHU.Filter.E_FilterMervType,
        private _originalFilterEfficiency: EnumsAHU.Filter.E_FilterEfficiency)
    {
        super(instanceName, data);

        this._storeAHU = CGlobals.INJECTOR.get(TOKEN_IDescriptorStoreAHU);
    }

    private _storeAHU: IDescriptorStoreAHU;

    public get filterCompositeInstance(): ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_Composite_FilterMedia_FilterMerv_FilterEfficiency
    {
        return this._working as ModelInterfacesAHU.Configuration.DescriptorInstances.Filter.IDescriptorInstance_Composite_FilterMedia_FilterMerv_FilterEfficiency;
    }
    public get descriptorValueString(): string
    {
        let composite: DescriptorInterfacesAHU.Filter.IDescriptor_Composite_FilterMedia_FilterMerv_FilterEfficiency;

        composite = this._storeAHU.Filter._Composite_FilterMedia_FilterMerv_FilterEfficiency.list().find(
            i => i.media === this._originalFilterMedia &&
                i.mervRating === this._originalFilterMERV &&
                i.efficiency === this._originalFilterEfficiency);

        if (!composite)
        {
            return "N/A";
        }

        return composite.uiDescription;
    }
}