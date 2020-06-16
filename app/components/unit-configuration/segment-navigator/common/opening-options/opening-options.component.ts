import { Component, Input, ViewChild, AfterViewInit, Inject, OnInit, AfterViewChecked } from '@angular/core';

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { Guid } from "@jci-ahu/shared.guid";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";

import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

import { IDescriptorStoreCommon } from "@jci-ahu/data.common.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreCommon } from "@jci-ahu/data.common.descriptor-store.interfaces";

import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";
import { IDamper } from '@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Types/IDamper';

@Component({

    selector: 'opening-options',
    templateUrl: "./opening-options.component.html",
    styleUrls:
        [
            "./opening-options.component.css"
        ]
})

export class OpeningOptionsComponent implements OnInit {

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    @Input("show")
    show: boolean;

    currentOpening: ModelInterfacesAHU.Configuration.Types.IOpening = null;
    openingLeft: ModelInterfacesAHU.Configuration.Types.IOpening = null;
    openingRight: ModelInterfacesAHU.Configuration.Types.IOpening = null;

    currentDamper: ModelInterfacesAHU.Configuration.Types.IDamper = null;
    private _currentUnitSide: EnumsCommon.Common.E_UnitSide = EnumsCommon.Common.E_UnitSide.Left;


    @ViewChild(IgGridComponent) igGrid: IgGridComponent;

    private _modelData = [];
    model: igGridCfg = null;

    constructor( @Inject(TOKEN_IDescriptorStoreAHU) private _descriptorAHU: IDescriptorStoreAHU,
        @Inject(TOKEN_IDescriptorStoreCommon) private _descriptorCommon: IDescriptorStoreCommon
    ) {

    }

    gridID: Guid = Guid.newGuid();

    public get gridTableID(): string {
        return "accessOption_" + this.gridID.toString();
    }

    ngOnInit() {

        this.loadOpening();
        this.loadGridCfg();
        this.getModelData();
        this.igGrid.createTable();
    }


    private getModelData() {
        let modelData = [];
        let summaryModel: any;
        let damper: undefined;


        this.segment.getOpeningList(true, false).forEach((op, i) => {
            let opening = op;
            let damper: IDamper;
            if (opening.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlanged ||
                opening.openingType === EnumsAHU.Opening.E_OpeningType.DamperFlush ||
                opening.openingType === EnumsAHU.Opening.E_OpeningType.Standard ||
                opening.openingType === EnumsAHU.Opening.E_OpeningType.FieldCut) {

                damper = opening.damperList[0]
            }

            summaryModel = {
                openingId: opening.id,
                openingType: opening.openingType,
                location: opening.unitSide,
                safetyCoverType: opening.safetyScreenType,
                safetyCoverMAterialType: opening.safetyScreenMaterialStyle,
                damperType: damper !== undefined ? damper.bladeType : '',
                damperMaterial: damper !== undefined ? damper.damperMaterialType : '',
                damperOrientation: damper !== undefined ? damper.bladeOrientation : '',
                damperLeakge: damper !== undefined ? damper.leakageType : '',
                damperConfiguration: damper !== undefined ? damper.configuration : '',
                damperFailPosition: damper !== undefined ? damper.smokeDamperOptions.failPosition : '',
                damperVoltage: damper !== undefined ? damper.smokeDamperOptions.actuatorControlVoltage : '',
                damperEndSwitch: '',
                damperControlSignal: damper !== undefined ? damper.smokeDamperOptions.actuatorControlSignalType : '',
            }
            modelData.push(summaryModel);

        });

        this._modelData = modelData;
        this.model.dataSource = modelData;
    }

    private loadOpening(): void {
        this.openingLeft = this.segment.getOpeningList_Left(true, true)[0];

        this.openingRight = this.segment.getOpeningList_Right(true, true)[0];

        if (this.openingLeft !== undefined) {
            this.currentOpening = this.openingLeft;
        }

        if (this.openingRight !== undefined) {
            this.currentOpening = this.openingRight;
        }
    }

    private loadGridCfg(): void {
        this.model = {
            primaryId: 'openingId',
            dataSource: [],
            columns: [
                {
                    headerText: "openingId", key: "openingId", dataType: "string",
                    allowHiding: true,
                    hidden: true
                },
                {
                    headerText: "Opening",
                    group: [
                        {
                            headerText: "Type",
                            key: "openingType",
                            width: "auto",
                            dataType: "string",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Opening.OpeningType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {

                            headerText: "Location", key: "location", width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorCommon.Common.UnitSide.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Safety Cover Type", key: "safetyCoverType", width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Opening.SafetyScreenType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }

                        },
                        {
                            headerText: "Safety Cover Material Type", key: "safetyCoverMAterialType", width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.ConstructionOptions.MaterialStyle.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }

                        }
                    ]
                },
                {
                    headerText: "Damper",
                    group: [
                        {
                            headerText: "Type",
                            key: "damperType",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.DamperBladeType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Material",
                            key: "damperMaterial",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.DamperMaterialType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Orientation",
                            key: "damperOrientation",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.DamperBladeOrientation.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }

                        },
                        {
                            headerText: "Leakage",
                            key: "damperLeakge",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.DamperLeakageType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Configuration",
                            key: "damperConfiguration",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.DamperConfiguration.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Fail Position",
                            key: "damperFailPosition",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.SmokeDamperFailPosition.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "Voltage",
                            key: "damperVoltage",
                            width: "110px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.SmokeDamperActuatorControlVoltage.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                        {
                            headerText: "End Switch",
                            key: "damperEndSwitch",
                            width: "110px"
                        },
                        {
                            headerText: "Control Signal",
                            key: "damperControlSignal",
                            width: "120px",
                            formatter: (val) => {
                                let list = this._descriptorAHU.Damper.SmokeDamperActuatorControlSignalType.list();
                                let returnVal: string = ''
                                list.forEach((op, i) => {
                                    if (val === op.enum) {
                                        returnVal = op.uiDescription;
                                    }
                                });
                                return returnVal;
                            }
                        },
                    ]
                },

            ],
            features:
            [
                    {
                        columnKey: "openingId",
                        readOnly: true
                    },
                    {
                        name: "Filtering",
                    },
                    {
                        name: "ColumnMoving",
                        mode: "immediate",
                        addMovingDropdown: true,
                        type: "render"
                    },
                    {
                        name: "Paging",
                        type: "local",
                        pageSize: 5
                    },
                    {
                        name: 'MultiColumnHeaders'
                    },
                    {
                        name: "Updating",
                        enableAddRow: false,
                        enableDeleteRow: false,
                        editMode: "cell",
                        mode: "immediate",
                        columnSettings: [
                            {
                                columnKey: "openingType",
                                readonly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Opening.OpeningType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },

                            {
                                columnKey: "location",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorCommon.Common.UnitSide.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },

                            {
                                columnKey: "safetyCoverType",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Opening.SafetyScreenType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },

                            {
                                columnKey: "safetyCoverMAterialType",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.ConstructionOptions.MaterialStyle.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },

                            {
                                columnKey: "damperType",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.DamperBladeType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperMaterial",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.DamperMaterialType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperOrientation",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.DamperBladeOrientation.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperLeakge",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.DamperLeakageType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperConfiguration",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.DamperConfiguration.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperFailPosition",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.SmokeDamperFailPosition.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperVoltage",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.SmokeDamperActuatorControlVoltage.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            },
                            {
                                columnKey: "damperControlSignal",
                                readOnly: false,
                                editorType: "combo",
                                editorOptions: {
                                    mode: "dropdown",
                                    dataSource: this._descriptorAHU.Damper.SmokeDamperActuatorControlSignalType.list(),
                                    textKey: "uiDescription",
                                    valueKey: "enum"
                                }
                            }
                        ]
                    }
            ]
        }

    }

}