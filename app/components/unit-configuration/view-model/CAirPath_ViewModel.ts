import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";

import { CUnit_ViewModel } from "./CUnit_ViewModel"
import { CSegment_ViewModel } from "./CSegment_ViewModel"

export class CAirPath_ViewModel
{
    constructor(
        private _unit: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IAirPath)
    {
    }

    // #region segmentList

    private _segmentList: CSegment_ViewModel[] = [];

    public get segmentList(): CSegment_ViewModel[]
    {
        let list: CSegment_ViewModel[];
        let segmentList: CSegment_ViewModel[];

        list = [];

        segmentList = this._unit.segmentList;
 
        this.model.segmentReferenceList.forEach(
            i =>
            {
                let segment: CSegment_ViewModel;

                segment = segmentList.find(j => j.model.id.equals(i.segmentID));

                if (segment)
                {
                    list.push(segment);
                }
            });

        return list;
    }

    // #endregion

    // #region isOpenInTunnelNavigator

    private _isOpenInTunnelNavigator: boolean = false;

    public get isOpenInTunnelNavigator(): boolean
    {
        return this._isOpenInTunnelNavigator; 
    }
    public set isOpenInTunnelNavigator(value: boolean)
    {
        this._isOpenInTunnelNavigator = value;
    }

    // #endregion

    public get model(): ModelAHU.Configuration.Types.IAirPath
    {
        return this._model;
    }
}