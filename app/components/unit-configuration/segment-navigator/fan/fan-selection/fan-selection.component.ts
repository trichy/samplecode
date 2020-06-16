import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Input } from "@angular/core";

import { igGridCfg } from "@local/app/models/igGrid/igGridCfg.model";
import { IgGridComponent } from "@local/app/shared/ui/igGrid/iggrid.component";
import { FanRatingService } from "@local/app/shared/services/fan-rating.service";
import { FanRating } from "@local/app/shared/services/fan-rating.model";

import { ToastrService } from "@local/app/common/toastr/toastr.service";

import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

@Component
    ({
        selector: "fan-selection",
        templateUrl: "./fan-selection.component.html",
        styleUrls:
            [
                "./fan-selection.component.css"
            ]
    })
export class FanSelectionComponent implements OnInit
{
    constructor(
        private fanRatingService: FanRatingService,
        private tostrService: ToastrService)
    {
    }

    @Input("segment")
    segment: ModelInterfacesAHU.Configuration.Segments.ISegment = null;

    public model: igGridCfg;
    public showGrid: boolean = false;     
    @ViewChild(IgGridComponent) igGrid: IgGridComponent;  

    public isInvalidNumber: boolean = false;

    private tspBox: number = 0;
    private tspBoxBack: number = 0;

    ngOnInit()
    {
        this.setGridColumns();
    }
    
    private setGridColumns()
    {
        this.model = {
            primaryId: 'FanClass',
            columns: [
                { headerText: 'Fan Class', key: "FanClass", dataType: "string", width: "150px" },
                { headerText: 'Fan Vendor Type', key: "FanVendorType", dataType: "string", width: "150px" },
                { headerText: "Fan Size", key: "FanSize", dataType: "string", width: "150px" },
                { headerText: "Air Flow CFM", key: "AirflowCFM", dataType: "string", width: "150px" },
                { headerText: "Altitude Ft", key: "AltitudeFt", dataType: "string", width: "150px" },
                { headerText: "TSP In wg", key: "TSPInwg", dataType: "string", width: "150px" },
                {
                    headerText: "RPM", key: "RPM", dataType: "number", width: "150px",
                    formatter: function (val: number)
                    {
                        return val.toFixed(2);
                    }
                },
                {
                    headerText: "HP", key: "HP", dataType: "number", width: "150px",
                    formatter: function (val: number)
                    {
                        return val.toFixed(2);
                    }
                },
                { headerText: "Air Density Variation WithAltitude", key: "AirDensityVariationWithAltitude", dataType: "string", width: "150px" },
                { headerText: 'Percent Wheel Width', key: "PercentWheelWidth", dataType: "string", width: "150px" },
                { headerText: 'Percent Wheel Diameter', key: "PercentWheelDiameter", dataType: "string", width: "150px" },
                { headerText: 'Voltage', key: "Voltage", dataType: "string", width: "150px" },
                { headerText: 'Input Power', key: "InputPower", dataType: "string", width: "150px" },
            ]

        }
    }

    viewFans(): void
    {
        let fanRating = this.getFanRatingMock();
        this.model.dataSource = [];
        this.fanRatingService.saveFanRating(fanRating).subscribe(data =>
        {
            if (data)
            {
                let fanRatingResult = data[0];
                if (fanRatingResult.Errors && fanRatingResult.Errors.length > 0)
                {
                    for (let i = 0; i < fanRatingResult.Errors.length; i++)
                    {
                        let error = fanRatingResult.Errors[i];
                        this.tostrService.error(error.Message);
                    }
                } else
                {
                    this.model.dataSource = data;
                    if (data.length >= 5) this.igGrid.updateTable('Paging')
                    this.tostrService.success("Success");
                }
            }
        }, error =>
        {
            this.tostrService.error(JSON.stringify(error));
        });
    }

    private getFanRatingMock(): FanRating
    {

        this.tspBoxBack = this.tspBox;
        return new FanRating({
            "ProductType": "SolutionYC",
            "FanVendorType": "DDPG2",
            "FanSize": "_182",
            "AirflowCFM": 6000,
            "AltitudeFt": 0,
            "TSPInwg": this.tspBox,
            "WheelWidthPercent": 80,
            "FanInputKw": "",
            "FanElectricalPower": "",
            "FanArray": "_1X1",
            "ReduntantFans": 0,
            "AirflowCFMPoints": [
                5940,
                5720,
                5500,
                5280,
                5060,
                4840,
                4620,
                4400,
                4180,
                3960,
                3740,
                3520,
                3300,
                3080,
                2860,
                2640,
                2420,
                2200,
                1980,
                1760,
                1540,
                1320,
                1100,
                880,
                660,
                440,
                220
            ],
            "TSPInwgPoints": [
                0.002,
                0.372,
                0.83,
                1.338,
                1.866,
                2.388,
                2.885,
                3.342,
                3.748,
                4.099,
                4.392,
                4.628,
                4.811,
                4.945,
                5.037,
                5.096,
                5.13,
                5.148,
                5.158,
                5.167,
                5.179,
                5.2,
                5.23,
                5.266,
                5.303,
                5.332,
                5.339,
                5.303
            ],
            "BHPPoints": [
                2.091,
                2.311,
                2.548,
                2.787,
                3.013,
                3.216,
                3.389,
                3.525,
                3.622,
                3.68,
                3.698,
                3.679,
                3.625,
                3.54,
                3.429,
                3.297,
                3.147,
                2.987,
                2.818,
                2.646,
                2.473,
                2.302,
                2.132,
                1.965,
                1.796,
                1.624,
                1.441,
                1.24
            ],
            "RPM": 2234,
            "SurgePercent": 40
        });
    }

}