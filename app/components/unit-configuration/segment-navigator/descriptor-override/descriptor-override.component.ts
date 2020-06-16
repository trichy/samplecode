import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

import { Guid } from "@jci-ahu/shared.guid";
import { CUtility } from "@jci-ahu/shared.utility";

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";

import { CDescriptorInstanceWrapper } from "./descriptor-instance-wrappers/CDescriptorInstanceWrapper";

@Component
    ({
        selector: "descriptor-override",
        templateUrl: "./descriptor-override.component.html",
        styleUrls:
            [
                "./descriptor-override.component.css"
            ]
    })
export class DescriptorOverrideComponent
{
    constructor()
    {
    }

    @Output("okclick")
    okClick: EventEmitter<void> = new EventEmitter<void>();

    @Output("cancelclick")
    cancelClick: EventEmitter<void> = new EventEmitter<void>();

    @Input("show")
    show: boolean = false;

    @Input("descriptorinstancelist")
    descriptorInstanceList: CDescriptorInstanceWrapper[] = [];

    gridID: Guid = Guid.newGuid();
    public get gridTableID(): string
    {
        return "designAssistTable_" + this.gridID.toString();
    }

    model: igGridCfg = {
        primaryId: "id",
        renderCheckboxes: true,
        dataSource: [],
        columns: [
            {
                key: "id",
                dataType: "string",
                allowHiding: true,
                hidden: true
            },
            {
                headerText: "Override",
                key: "hasOverride",
                dataType: "bool",
                width: "100px",
                //formatter: function (val, record) { return val ? "Override" : ""; }
            },
            {
                key: "instanceName",
                headerText: "Option Name",
                dataType: "string",
                width: "130px"
            },
            {
                key: "descriptorValueString",
                headerText: "Original Value",
                dataType: "string",
                width: "130px"
            },
            {                
                key: "overrideValue",
                headerText: "Override Value",
                dataType: "string",
                width: "130px"
            },
            {
                key: "overrideWeight",
                headerText: "Weight",
                dataType: "number",
                width: "auto"
            },
            {
                key: "overrideLength",
                headerText: "Length",
                dataType: "number",
                width: "auto"
            },
            {
                key: "overridePrice",
                headerText: "Price",
                dataType: "number",
                width: "auto"
            },
            {
                key: "overrideForRelease",
                headerText: "For Release?",
                dataType: "bool",
                format: "checkbox",
                width: "130px",
                formatter: function (val, record) { return val ? "Yes" : "No"; }
            },
            {
                key: "overrideAttachments",
                headerText: "Attachments",
                dataType: "string",
                width: "130px"
            }
        ],
        show: true,
        features:
            [
                {
                    name: "Updating",
                    enableAddRow: false,
                    enableDeleteRow: false,
                    editMode: "cell",
                    columnSettings:
                        [
                            {
                                columnKey: "id",
                                readOnly: true
                            },
                            {
                                columnKey: "hasOverride",
                                readOnly: false
                            },
                            {
                                columnKey: "instanceName",
                                readOnly: true
                            },
                            {
                                columnKey: "descriptorValueString",
                                readOnly: true
                            },
                            {
                                columnKey: "overrideAttachments",
                                readOnly: true
                            }
                        ]
                },
                {
                    name: "Filtering",
                }
            ]
    };


    public isOKEnabled(): boolean
    {
        let count: number;

        count = this.descriptorInstanceList.filter(i => i.hasOverride && CUtility.isNullOrWhiteSpace(i.overrideValue)).length;

        return (count === 0);
    }

    public onCancelClicked(): void
    {
        this.cancelClick.emit();
    }
    public onOKClicked(): void
    {
        this.descriptorInstanceList.forEach((element) => {
            if (!element.hasOverride) {
                element.overrideValue = "";
            }
        })

        this.descriptorInstanceList.forEach(i => i.commit());
               
        this.okClick.emit();
    }
}