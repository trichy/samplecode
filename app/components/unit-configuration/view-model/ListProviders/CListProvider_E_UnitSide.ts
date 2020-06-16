import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as DescriptorStoreCommon from "@jci-ahu/data.common.descriptor-store.interfaces"
import { CGlobals } from "@local/app/CGlobals";

export class CListProvider_E_UnitSide implements PG.Types.IListProvider {
    private static _LIST: PG.Types.CListItem[] = null;
    private _storeCommon: DescriptorStoreCommon.IDescriptorStoreCommon = null;

    constructor() {
    }

    public List: PG.Types.CListItem[] = [];

    public Init(): void
    {
        if (CListProvider_E_UnitSide._LIST === null) {
            CListProvider_E_UnitSide._LIST = [];

            if (this._storeCommon === null)
            {
                this._storeCommon = CGlobals.INJECTOR.get(DescriptorStoreCommon.TOKEN_IDescriptorStoreCommon);
            }

            this._storeCommon.Common.UnitSide.list().forEach(
                i => CListProvider_E_UnitSide._LIST.push(
                    new PG.Types.CListItem(i.uiDescription, i.enum)));    
        }

        this.List = CListProvider_E_UnitSide._LIST;
    }
    public RequeryList(options: any) {
    }
}