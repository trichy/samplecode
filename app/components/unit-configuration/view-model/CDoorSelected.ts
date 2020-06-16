import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import { Guid } from "@jci-ahu/shared.guid/lib";
import { CDoor_ViewModel } from "./CDoor_ViewModel";

export class CDoorSelected {

    private static _list: Array<ModelAHU.Configuration.Types.IDoor> = new Array<ModelAHU.Configuration.Types.IDoor>();
    private static _doorSelected: ModelAHU.Configuration.Types.IDoor = null;
    private static _viewModel: Map<Guid, CDoor_ViewModel> = new Map<Guid, CDoor_ViewModel>();

    public static set doorSelected(value: ModelAHU.Configuration.Types.IDoor) {
        this.clearAllSelectedRender();

        this._doorSelected = value;
        if (value === null) { }
        else {
            let viewModel: CDoor_ViewModel = this._viewModel.get(value.id);
            viewModel.isSelected = true;
            viewModel.render();
        }
    }

    public static get doorSelected(): ModelAHU.Configuration.Types.IDoor {
        return this._doorSelected;
    }

    public static setSelectedDoor(id: Guid, selected: boolean): void {
        let door: ModelAHU.Configuration.Types.IDoor = null;
        this._list.forEach(l => {
            if (l.id.equals(id)) door = l;
        });
        if (!selected)
            this.doorSelected = null;
        else
            this.doorSelected = door;
      
    }

    public static addToDoorList(value: ModelAHU.Configuration.Types.IDoor, viewModel: CDoor_ViewModel) {
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

    public static getDoorViewModel(): CDoor_ViewModel {

        if (this.doorSelected !== null)
            return this._viewModel.get(this.doorSelected.id);

        else return null;
    }

    public static clearDoors() {
        this._list = new Array<ModelAHU.Configuration.Types.IDoor>();
        this.clearAllSelectedRender();
        this._viewModel.clear();
    }


    public static clearAllSelectedRender() {
        this._doorSelected = null;
        for (let vm of this._viewModel.values()) {
            if (vm.isSelected) {
                vm.isSelected = false;
                vm.render();
            }
        }

    }

}