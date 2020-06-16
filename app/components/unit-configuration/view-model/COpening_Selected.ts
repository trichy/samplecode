import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces"
import { Guid } from "@jci-ahu/shared.guid/lib";
import { COpening_ViewModel } from "./COpening_ViewModel";

export class COpening_Selected {

    private static _list: Array<ModelAHU.Configuration.Types.IOpening> = new Array<ModelAHU.Configuration.Types.IOpening>();
    private static _openingSelected: ModelAHU.Configuration.Types.IOpening = null;
    private static _viewModel: Map<Guid, COpening_ViewModel> = new Map<Guid, COpening_ViewModel>();

    public static set openingSelected(value: ModelAHU.Configuration.Types.IOpening) {
        this.clearAllSelectedRender();

        this._openingSelected = value;
        if (value === null) { }
        else {
            let viewModel: COpening_ViewModel = this._viewModel.get(value.id);
            viewModel.isSelected = true;
            viewModel.damperlist.forEach(damper => { damper.isSelected = true; });
            viewModel.standardlist.forEach(standard => { standard.isSelected = true; });
            viewModel.render();
        }
    }

    public static get openingSelected(): ModelAHU.Configuration.Types.IOpening {
        return this._openingSelected;
    }

    public static setSelectedOpening(id: Guid, selected: boolean): void {
        let opening: ModelAHU.Configuration.Types.IOpening = null;
        this._list.forEach(l => {
            if (l.id.equals(id)) opening = l;
        });
        if (!selected) {
            this.openingSelected = null;
        }
        else {
            this.openingSelected = opening;
        }
    }

    public static addToOpeningList(value: ModelAHU.Configuration.Types.IOpening, viewModel: COpening_ViewModel) {
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

    public static getOpeningViewModel(): COpening_ViewModel {

        if (this.openingSelected !== null)
            return this._viewModel.get(this.openingSelected.id);
        else
            return null;
    }

    public static clearOpenings() {
        this._list = new Array<ModelAHU.Configuration.Types.IOpening>();
        this.clearAllSelectedRender();
        this._viewModel.clear();
    }

    public static clearAllSelectedRender() {
        this._openingSelected = null;

        for (let vm of this._viewModel.values()) {
            if (vm.isSelected) {
                vm.isSelected = false;
                vm.damperlist.forEach(damper => { damper.isSelected = false; });
                vm.standardlist.forEach(standard => { standard.isSelected = false; })
                vm.render();
            }
        }

    }
}