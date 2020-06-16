import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces"
import { Guid } from "@jci-ahu/shared.guid/lib";
import { CTransformer_ViewModel } from "./CTransformer_ViewModel";

export class CTransformer_Selected {

    private static _list: Array<ModelAHU.Configuration.Types.ITransformer> = new Array<ModelAHU.Configuration.Types.ITransformer>();
    private static _selectedItem: ModelAHU.Configuration.Types.ITransformer = null;
    private static _viewModel: Map<Guid, CTransformer_ViewModel> = new Map<Guid, CTransformer_ViewModel>();

    public static set selectedItem(value: ModelAHU.Configuration.Types.ITransformer) {
        this.clearAllSelectedRender();

        this._selectedItem = value;
        if (this._selectedItem === null) { }
        else {
            let viewModel: CTransformer_ViewModel = this._viewModel.get(value.id);
            viewModel.isSelected = true;
            viewModel.render();
        }
    }

    public static get selectedItem(): ModelAHU.Configuration.Types.ITransformer {
        return this._selectedItem;
    }


    public static setselectedItem(id: Guid, selected: boolean): void {
        let item: ModelAHU.Configuration.Types.ITransformer = null;
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


    public static addToList(value: ModelAHU.Configuration.Types.ITransformer, viewModel: CTransformer_ViewModel) {
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

    public static getViewModel(): CTransformer_ViewModel {

        if (this !== null)
            return this._viewModel.get(this.selectedItem.id);
        else
            return null;
    }

    public static clear() {
        this.clearAllSelectedRender();
        this._list = new Array<ModelAHU.Configuration.Types.ITransformer>();
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