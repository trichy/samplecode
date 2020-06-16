import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Input } from "@angular/core";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import { WorkingDataService } from "@local/app/services/working-data.service";
import { SpinnerModel } from "@local/app/core/model/spinner.model";

@Component
    ({
        selector: "access-options",
        templateUrl: "./access-options.component.html",
        styleUrls:
            [
                "./access-options.component.css"
            ]
    })
export class AccessOptionsComponent implements OnInit
{
    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    openingLeft: ModelInterfacesAHU.Configuration.Types.IOpening = null;
    openingRight: ModelInterfacesAHU.Configuration.Types.IOpening = null;

    currentOpening: ModelInterfacesAHU.Configuration.Types.IOpening = null;
    currentDoor: ModelInterfacesAHU.Configuration.Types.IDoor = null;

    accessWidthSpinner: SpinnerModel;
    showSpinner: boolean = true;

    constructor(private _workingData: WorkingDataService) {

    }

    // #region currentUnitSide

    private _currentUnitSide: EnumsCommon.Common.E_UnitSide = EnumsCommon.Common.E_UnitSide.Left;

    public get currentUnitSide(): EnumsCommon.Common.E_UnitSide
    {
        return this._currentUnitSide;
    }
    public set currentUnitSide(value: EnumsCommon.Common.E_UnitSide)
    {
        if (this._currentUnitSide !== value)
        {
            this._currentUnitSide = value;

            if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Left)
            {
                this.currentOpening = this.openingLeft;
            }

            if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Right)
            {
                this.currentOpening = this.openingRight;
            }

            if (this.currentOpening.doorList.length === 0)
            {
                this.currentDoor = null;
            }
            else
            {
                this.currentDoor = this.currentOpening.doorList[0];
            }
        }
    }

    // #endregion

    ngOnInit(): void
    {
        this.openingLeft = this.segment.getOpeningList_Left(false, true)
            .find(i => i.openingType === EnumsAHU.Opening.E_OpeningType.Door ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.AccessPanel);

        if (!this.openingLeft)
        {
            let door: ModelInterfacesAHU.Configuration.Types.IDoor;

            door = this.segment.addDoor(EnumsCommon.Common.E_UnitSide.Left);

            this.openingLeft = door.opening;
            this.openingLeft.door.hingeLocationByAirFlowDirection = EnumsAHU.Common.E_AirFlowDirection.Upstream;
            this.openingLeft.delete();
        }

        this.openingRight = this.segment.getOpeningList_Right(false, true)
            .find(i => i.openingType === EnumsAHU.Opening.E_OpeningType.Door ||
                i.openingType === EnumsAHU.Opening.E_OpeningType.AccessPanel);

        if (!this.openingRight)
        {
            let door: ModelInterfacesAHU.Configuration.Types.IDoor;

            door = this.segment.addDoor(EnumsCommon.Common.E_UnitSide.Left);

            this.openingRight = door.opening;
            this.openingRight.door.hingeLocationByAirFlowDirection = EnumsAHU.Common.E_AirFlowDirection.Downstream;
            this.openingRight.delete();
        }

        if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Left)
        {
            this.currentOpening = this.openingLeft;
        }

        if (this._currentUnitSide === EnumsCommon.Common.E_UnitSide.Right)
        {
            this.currentOpening = this.openingRight;
        }

        if (this.currentOpening.doorList.length === 0)
        {
            this.currentDoor = null;
        }
        else
        {
            this.currentDoor = this.currentOpening.doorList[0];
        }
     
        this.accessWidthSpinner = new SpinnerModel();
        this.accessWidthSpinner.Id = 'access-width-spinner_' + this.segment.id.toString();
        this.accessWidthSpinner.Max = this.segment.geometry.xLength - (this.currentOpening.geometry.x - this.segment.geometry.x);
        this.accessWidthSpinner.Min = 0;
        this.accessWidthSpinner.Value = 1
        this.accessWidthSpinner.Step = 1;
        this.accessWidthSpinner.Width = 125;
    }

    viewPortChange() {
        this._workingData.WorkingUnit.openinglist.forEach((opening) => {
            if (opening.model.id.equals(this.currentOpening.id)) {
               
                if (opening.doorlist && opening.doorlist.length > 0) {
                    opening.doorlist.forEach((door) => {
                        if (door.model.id.equals(this.currentDoor.id)) {
                            door.dispose();
                            door.model.viewportType = this.currentDoor.viewportType;
                            door.render();
                            if (door.isSelected) {
                                door.setSelectedMaterial();
                            } else {
                                door.setUnselectedMaterial();
                            }
                        }
                    })
                }
            }
        })
    }

    widthChange() {
        let changeDoorandOpeningWidth = true;;

        this._workingData.WorkingUnit.segmentList.forEach((segment) => {
            segment.model.getOpeningList(true, false).forEach((segOpen) => {
                if (segOpen.id.equals(this.currentOpening.id)) {
                    let openingStart = segOpen.geometry.x - segment.model.geometry.x;
                    if ((segOpen.geometry.xLength + openingStart) > segment.model.geometry.xLength) {
                        changeDoorandOpeningWidth = false;
                    }

                }
            })
        })
        if (changeDoorandOpeningWidth) {
            this._workingData.WorkingUnit.openinglist.forEach((opening) => {
                if (opening.model.id.equals(this.currentOpening.id)) {
                    if (opening.doorlist && opening.doorlist.length > 0) {
                        opening.doorlist.forEach((door) => {
                            if (door.model.id.equals(this.currentDoor.id)) {
                                door.dispose();
                                door.model.geometry.xLength = this.currentOpening.accessWidth;
                                opening.model.geometry.xLength = this.currentOpening.accessWidth;

                                door.render();
                                if (door.isSelected) {
                                    door.setSelectedMaterial();
                                } else {
                                    door.setUnselectedMaterial();
                                }
                            }
                        })
                    }
                }
            })
            this._workingData.WorkingUnit.segmentList.forEach((segment) => {
                segment.model.getOpeningList(true, false).forEach((segOpen) => {
                    if (segOpen.id.equals(this.currentOpening.id)) {
                        segment.dispose();
                        segment.render();
                        if (segment.isSelected) {
                            segment.setSelectedMaterial();
                        } else {
                            segment.setUnselectedMaterial();
                        }
                    }
                })
            })

        }
    }

    accessWidthSpinner_keyPress(event: any)
    {
        const pattern = /[0-9\.\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar))
        {
            event.preventDefault();
        }
    }

    public get currentOpeningIsDeleted(): boolean
    {
        if (this.currentOpening === null) return false;

        return this.currentOpening.isDeleted;
    }
    public set currentOpeningIsDeleted(value: boolean)
    {
        if (this.currentOpening === null) return;

        if (value)
        {
            this.currentOpening.delete();
        }
        else
        {
            this.currentOpening.undelete();
        }
    }
}