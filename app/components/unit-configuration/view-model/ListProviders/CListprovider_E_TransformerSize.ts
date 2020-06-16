import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as DescriptorStoreAHU from "@jci-ahu/data.ahu.descriptor-store.interfaces"
import { CGlobals } from "@local/app/CGlobals";

export class CListprovider_E_TransformerSize implements PG.Types.IListProvider {
    private static _LIST: PG.Types.CListItem[] = null;
    private _storeAHU: DescriptorStoreAHU.IDescriptorStoreAHU = null;

    constructor() {
    }

    public List: PG.Types.CListItem[] = [];

    public Init(): void {
        if (CListprovider_E_TransformerSize._LIST === null) {
            CListprovider_E_TransformerSize._LIST = [];

            if (this._storeAHU === null) {
                this._storeAHU = CGlobals.INJECTOR.get(DescriptorStoreAHU.TOKEN_IDescriptorStoreAHU);
            }

            this._storeAHU.Electrical.TransformerSize.list().forEach(
                i => CListprovider_E_TransformerSize._LIST.push(
                    new PG.Types.CListItem(i.uiDescription, i.enum)));
        }

        this.List = CListprovider_E_TransformerSize._LIST;
    }
    public RequeryList(options: any) {
    }
}