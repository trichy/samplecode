import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CAirPath_ViewModel } from "./CAirPath_ViewModel";
import { IRenderable } from "./IRenderable";
import { CSegment_ViewModel } from "./CSegment_ViewModel";
import { CUnitBase_ViewModel } from "./CUnitBase_ViewModel";
import { CMotorControl_ViewModel } from "./CMotorControl_ViewModel";
import { CTransformer_ViewModel } from "./CTransformer_ViewModel";
import { CSQEnclosure_ViewModel } from "./CSQEnclosure_ViewModel";
import { CFPCControllerEnclosure_ViewModel } from "./CFPCControllerEnclosure_ViewModel";
import { COpening_ViewModel } from "./COpening_ViewModel";
import { CDoorSelected } from "./CDoorSelected";
import { CDoor_ViewModel } from "./CDoor_ViewModel";
import { CBulkhead_ViewModel } from "./CBulkhead_ViewModel";

import { Guid } from "@jci-ahu/shared.guid";
import { COpening_Selected } from "./COpening_Selected";
import { IOpening, ISegmentReference } from "@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Types";
import { CTransformer_Selected } from "./CTransformer_Selected";
import { CSQEnclosure_Selected } from "./CSQEnclosure_Selected";
import { CMotorControl_Selected } from "./CMotorControl_Selected";
import { CFPCControllerEnclosure_Selected } from "./CFPCControllerEnclosure_Selected";

export class CUnit_ViewModel
{
    constructor(private _model: ModelAHU.Configuration.Types.IUnit)
    {
    }

    // #region segmentList

    private _segmentList = null;

    public get segmentList(): CSegment_ViewModel[]
    {
        if (this._segmentList === null)
        {
            this._segmentList = [];

            this.model.segmentList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._segmentList.push(new CSegment_ViewModel(this, i));
                    }
                });
        }

        return this._segmentList;
    }

    // #endregion

    // #region unitbaseList

    private _unitbaseList = null;

    public get unitbaseList(): CUnitBase_ViewModel[]
    {
        if (this._unitbaseList === null)
        {
            this._unitbaseList = [];

            this.model.unitBaseList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._unitbaseList.push(new CUnitBase_ViewModel(this, i));
                    }
                });
        }

        return this._unitbaseList;
    }

    // #endregion

    // #region airPathList

    private _airPathList: CAirPath_ViewModel[] = null;

    public get airPathList(): CAirPath_ViewModel[]
    {
        if (this._airPathList === null)
        {
            this._airPathList = [];

            this._model.airPathList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._airPathList.push(new CAirPath_ViewModel(this, i));
                    }
                });
        }

        return this._airPathList;
    }

    // #endregion

    //#region openings

    private _openinglist = null;

    public get openinglist(): COpening_ViewModel[]
    {
        if (this._openinglist === null)
        {
            this._openinglist = [];

            this.model.openingList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {

                        this._openinglist.push(new COpening_ViewModel(this, i));
                    }
                });

        }

        return this._openinglist;
    }

    //#endregion

    // #region ElectricalOptionsList

    private _electricalOptionsList = null;

    public get electricalOptionsList()
    {
        if (this._electricalOptionsList === null)
        {
            this._electricalOptionsList = [];

            this.model.electricalOptions.motorControlList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._electricalOptionsList.push(new CMotorControl_ViewModel(this, i));
                    }
                });

            this.model.electricalOptions.transformerList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._electricalOptionsList.push(new CTransformer_ViewModel(this, i));
                    }
                });

            this.model.electricalOptions.sqEnclosureList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._electricalOptionsList.push(new CSQEnclosure_ViewModel(this, i));
                    }
                });

            this.model.electricalOptions.fpcControllerEnclosureList.forEach(
                i =>
                {
                    if (i.isDeleted === false)
                    {
                        this._electricalOptionsList.push(new CFPCControllerEnclosure_ViewModel(this, i));
                    }
                });
        }

        return this._electricalOptionsList;
    }

    // #endregion

    // #region bulkheadList

    private _bulkheadList: CBulkhead_ViewModel[] = null;

    public get bulkheadList(): CBulkhead_ViewModel[]
    {
        if (this._bulkheadList === null)
        {
            this._bulkheadList = [];

            this._model.bulkheadList.forEach(
                i =>
                {
                    if (i.isDeleted) return;

                    this._bulkheadList.push(new CBulkhead_ViewModel(this, i));
                });
        }

        return this._bulkheadList;
    }

    // #endregion

    // #region SelectedDoor

    public _doorSelected: ModelAHU.Configuration.Types.IDoor;

    public get getDoorSelected(): ModelAHU.Configuration.Types.IDoor {
        let door: ModelAHU.Configuration.Types.IDoor = null;
        door = CDoorSelected.doorSelected;
        return door;
    }

    // #endregion
    
    // #region SelectedOpening 

    public get getOpeningSelected(): ModelAHU.Configuration.Types.IOpening {
        return COpening_Selected.openingSelected;
    }

    // #endregion 

    public get getTransformerSelected(): ModelAHU.Configuration.Types.ITransformer {
        return CTransformer_Selected.selectedItem;
    }

    public get getSQEnclosureSelected(): ModelAHU.Configuration.Types.ISQEnclosure {
        return CSQEnclosure_Selected.selectedItem;
    }

    public get getMotorControlSelected(): ModelAHU.Configuration.Types.IMotorControl {
        return CMotorControl_Selected.selectedItem;
    }

    public get getFPCControlEnclosureSelected(): ModelAHU.Configuration.Types.IFPCControllerEnclosure {
        return CFPCControllerEnclosure_Selected.selectedItem;
    }


    public _viewDoorViewModelSelected: CDoor_ViewModel;
    public get getDoorViewModelSelected(): CDoor_ViewModel {
        return CDoorSelected.getDoorViewModel();
    }

    public _viewOpeningViewModelSelected: COpening_ViewModel;
    public get getOpeningViewModelSelected(): COpening_ViewModel {
        return COpening_Selected.getOpeningViewModel();
    }

    public get getTransformerModelSelected(): CTransformer_ViewModel {
        return CTransformer_Selected.getViewModel();
    }

    public get getSQEnclosureModelSelected(): CSQEnclosure_ViewModel {
        return CSQEnclosure_Selected.getViewModel();
    }

    public get getMotorControlModelSelected(): CMotorControl_ViewModel {
        return CMotorControl_Selected.getViewModel();
    }

    public get getFPCControlEnclosureModelSelected(): CFPCControllerEnclosure_ViewModel {
        return CFPCControllerEnclosure_Selected.getViewModel();
    }


    public getSegmentViewModelByOpening(opening: IOpening): CSegment_ViewModel {
        let viewModel: CSegment_ViewModel = null;
        this.segmentList.forEach(s => {
            if (s.model.id == opening.segment().id)
                viewModel = s;
        });
        return viewModel;
    }


    public addNewSegmentUnit(viewModelSegment: CSegment_ViewModel): void {
        this._segmentList.push(viewModelSegment);
        this._model.segmentList.push(viewModelSegment.model);       
    }

    public get model(): ModelAHU.Configuration.Types.IUnit {
        return this._model;
    }

    public getRenderableObjectList(): IRenderable[] {
        let list: IRenderable[] = [];

        for (let unitbase of this.unitbaseList) {
            if (unitbase.model.isDeleted) continue;

            list.push(unitbase);
        }

        for (let segment of this.segmentList) {
            if (segment.model.isDeleted) continue;

            list.push(segment);
        }

        for (let opening of this.openinglist) {
            if (opening.model.isDeleted) continue;

            list.push(opening);
        }

        for (let electricalOptions of this.electricalOptionsList) {
            if (electricalOptions.model.isDeleted) continue;

            list.push(electricalOptions);
        }

        for (let bulkhead of this.bulkheadList)
        {
            if (bulkhead.model.isDeleted) continue;

            list.push(bulkhead);
        }

        return list;
    }

    public deleteSegment(selectedSegment) {
        this._segmentList.filter((segment, i) => {
            if (segment.model === selectedSegment) {
                let segmentIndex = this.model.segmentList.indexOf(segment.model);
                this.model.segmentList[segmentIndex].delete();
                this._segmentList.splice(i, 1);
            }
        });
    }

}