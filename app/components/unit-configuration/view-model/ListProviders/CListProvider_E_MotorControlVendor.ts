﻿import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as DescriptorStoreAHU from "@jci-ahu/data.ahu.descriptor-store.interfaces"
import { CGlobals } from "@local/app/CGlobals";

export class CListProvider_E_MotorControlVendor implements PG.Types.IListProvider {
    private static _LIST: PG.Types.CListItem[] = null;

    private _storeAHU: DescriptorStoreAHU.IDescriptorStoreAHU = null;

    constructor() {
    }

    public List: PG.Types.CListItem[] = [];

    public Init(): void {
        if (CListProvider_E_MotorControlVendor._LIST === null) {
            CListProvider_E_MotorControlVendor._LIST = [];

            if (this._storeAHU === null) {
                this._storeAHU = CGlobals.INJECTOR.get(DescriptorStoreAHU.TOKEN_IDescriptorStoreAHU);
            }

            this._storeAHU.MotorControl.MotorControlVendor.list().forEach(
                i => CListProvider_E_MotorControlVendor._LIST.push(
                    new PG.Types.CListItem(i.uiDescription, i.enum)));
        }

        this.List = CListProvider_E_MotorControlVendor._LIST;
    }
    public RequeryList(options: any) {
    }
}