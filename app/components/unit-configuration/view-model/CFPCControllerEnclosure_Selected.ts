import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces"
import { Guid } from "@jci-ahu/shared.guid/lib";
import { CFPCControllerEnclosure_ViewModel } from "./CFPCControllerEnclosure_ViewModel";

export class CFPCControllerEnclosure_Selected {

    private static _list: Array<ModelAHU.Configuration.Types.IFPCControllerEnclosure> = new Array<ModelAHU.Configuration.Types.IFPCControllerEnclosure>();
    private static _selectedItem: ModelAHU.Configuration.Types.IFPCControllerEnclosure = null;
    private static _viewModel: Map<Guid, CFPCControllerEnclosure_ViewModel> = new Map<Guid, CFPCControllerEnclosure_ViewModel>();

    public static set selectedItem(value: ModelAHU.Configuration.Types.IFPCControllerEnclosure) {
        this.clearAllSelectedRender();

        this._selectedItem = value;
        if (this._selectedItem === null) { }
        else {
            let viewModel: CFPCControllerEnclosure_ViewModel = this._viewModel.get(value.id);
            viewModel.isSelected = true;
            viewModel.render();
        }
    }

    public static get selectedItem(): ModelAHU.Configuration.Types.IFPCControllerEnclosure {
        return this._selectedItem;
    }


    public static setselectedItem(id: Guid, selected: boolean): void {
        let item: ModelAHU.Configuration.Types.IFPCControllerEnclosure = null;
        this._list.forEach(l => {
            if (l.id.equals(id)) item = l;
        });
        if (!selected) {
            this.selectedItem = null;
        }
        else {
            this.selectedItem = item;
        }
    }


    public static addToList(value: ModelAHU.Configuration.Types.IFPCControllerEnclosure, viewModel: CFPCControllerEnclosure_ViewModel) {
        let exist = false;
        this._list.forEach(l => {
            if (l.id.equals(value.id)) {
                exist = true;
            }
        });
        if (!exist) {
            this._list.push(value);
            this._viewModel.set(value.id, viewModel);
        }
    }

    public static getViewModel(): CFPCControllerEnclosure_ViewModel {

        if (this !== null)
            return this._viewModel.get(this.selectedItem.id);
        else
            return null;
    }

    public static clear() {
        this.clearAllSelectedRender();
        this._list = new Array<ModelAHU.Configuration.Types.IFPCControllerEnclosure>();
        this._viewModel.clear();
    }

    public static clearAllSelectedRender() {
        this._selectedItem = null;
        for (let vm of this._viewModel.values()) {
            if (vm.isSelected) {
                vm.isSelected = false;
                vm.render();
            }
        }

    }
}