import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CUnit_ViewModel } from "../view-model/CUnit_ViewModel";
import { NGSP_UNICODE } from "@angular/compiler";
import { CAirPath_ViewModel } from "../view-model/CAirPath_ViewModel";
import { CSegmentSelected } from "../view-model/CSegmentSelected";
import { Guid } from "@jci-ahu/shared.guid/lib";
import { UnitConfigurationService } from "../../../core/unit-configuration/unitConfiguration.service";

@Component
    ({
        selector: "tunnel-navigator",
        templateUrl: "./tunnel-navigator.component.html",
        styleUrls:
            [
                "./tunnel-navigator.component.css"
            ]
    })
export class TunnelNavigatorComponent implements OnInit {
    oneAtATime: boolean = true;
    @Input("unit")
    _unit: CUnit_ViewModel = null;
    _selectedPath: CAirPath_ViewModel = null;

    contentStyle: any;
    panelStyle: any;

    @Output() segmentSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() setTunnelFocus: EventEmitter<object> = new EventEmitter<object>();

    constructor(private unitConfigService: UnitConfigurationService) {

    }
    ngOnInit(): void {
       
        if (this._unit.airPathList.length > 8) {
            this.contentStyle = {
                height: "223px"
            };
        }
        else {
            this.contentStyle = {
                height: (248 - (this._unit.airPathList.length * 22) - 2 - this._unit.airPathList.length) + "px"
            };
        }
        this.panelStyle = {
            border: "none",
            "border-bottom": "1px solid #ccc",
            "margin-top": "0",
            "-webkit-box-shadow": "none"
        }

        this.selectDefaultTunel();
    }

    public changeValue(input: any): void {
        let ID = input.srcElement.id.toString().split('segment_')[1];
        if (this._unit) {
            if (this._unit.airPathList) {
                this._unit.airPathList.forEach((air, i) => {
                    air.segmentList.forEach((seg, i) => {
                        if (seg.model.id.toString() === ID) {
                            if (input.srcElement.checked) {
                                CSegmentSelected.RemoveSegment(seg.model);
                                CSegmentSelected.AddSegment(seg.model);
                            }
                            else {
                                CSegmentSelected.RemoveSegment(seg.model);
                            }
                        }
                    })
                })
            }
        }
        this.segmentSelected.emit(input.srcElement.checked);
        var tabSegmentId = input.target.id.replace('segment_', 'tab_');
        let tabel = document.getElementById(tabSegmentId.toLowerCase());
        if (tabel) tabel.scrollIntoView(false);
        
        this.segmentSelected.emit(input.srcElement.checked);

        this.unitConfigService.segmentSelected();
    }

    private selectDefaultTunel(): void {
        let airPath: CAirPath_ViewModel;
        if (this._unit) {
            if (this._unit.airPathList) {
                airPath = this._unit.airPathList[0];
                airPath.isOpenInTunnelNavigator = true;
                CSegmentSelected.AirPathSelected = airPath;
                this.showTunnelGroupList(0);
            }
        }
    }

    private showTunnelGroupList(tunnelindex: number): void {
        let tunnelCount = this._unit.airPathList.length;
        let selectedTunnel = this._unit.airPathList[tunnelindex];
        let selected: boolean = false;

        CSegmentSelected.AirPathSelected = selectedTunnel.isOpenInTunnelNavigator ? selectedTunnel : null;

        selectedTunnel.isOpenInTunnelNavigator === true ?
        (tunnelCount > 1 ? this.setTunnelFocus.emit({ tunnelIndex: (tunnelindex + 1), tunnelCount: tunnelCount, tunnelData: this._unit.airPathList[tunnelindex] }) : '') : null;       

        if (this._selectedPath != selectedTunnel) {
            if (this._selectedPath != null && this._selectedPath.segmentList.length > 0) {
                this._selectedPath.segmentList.forEach(seg => {
                    seg.isSelected = false;
                    CSegmentSelected.Dispose();
                });
            }

            if (selectedTunnel != null && selectedTunnel.segmentList.length > 0) {
                selectedTunnel.segmentList.forEach(seg => {
                    seg.isSelected = true;
                    CSegmentSelected.AddSegment(seg.model);
                });
                this._selectedPath = selectedTunnel;
            }
        }

    }

}