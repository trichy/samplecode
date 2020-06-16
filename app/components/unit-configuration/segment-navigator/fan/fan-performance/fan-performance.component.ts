import { Component } from "@angular/core";
import { Inject } from "@angular/core";
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

import * as DescriptorInterfacesAHU from "@jci-ahu/data.ahu.descriptors.interfaces";
import * as ModelInterfacesAHU from "@jci-ahu/data.ahu.model.interfaces";

import { IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";
import { TOKEN_IDescriptorStoreAHU } from "@jci-ahu/data.ahu.descriptor-store.interfaces";

@Component
    ({
        selector: "fan-performance",
        templateUrl: "./fan-performance.component.html",
        styleUrls:
            [
                "./fan-performance.component.css"
            ]
    })
export class FanPerformanceComponent
{
    @Input("fan")
    fan: ModelInterfacesAHU.Configuration.Types.IFan = null;
    motor: ModelInterfacesAHU.Configuration.Types.IMotor = null;

    espbox: number = 0.00;
    ispbox: number = 0.00;
    tspbox: number = this.espbox + this.ispbox;
    public disabledFanView: boolean;
    public isInvalidNumber: boolean = true;

    public fanDriveType: DescriptorInterfacesAHU.Fan.IDescriptorFanDriveType[] = [];
    public selectedFanDriveType: DescriptorInterfacesAHU.Fan.IDescriptorFanDriveType = null;

    public fanMotorManufacturer: DescriptorInterfacesAHU.Motor.IDescriptorMotorManufacturer[] = [];
    public selectedFanMotorManufacturer: DescriptorInterfacesAHU.Motor.IDescriptorMotorManufacturer = null;

    public fanClass: DescriptorInterfacesAHU.Fan.IDescriptorFanClass[];
    public selectedFanClass: DescriptorInterfacesAHU.Fan.IDescriptorFanClass = null;

    public electricalVoltage: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalVoltage[];
    public selectedElectricalVoltage: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalVoltage = null;

    public electricalPhase: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalPhase[];
    public selectedElectricalPhase: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalPhase = null;

    public electricalHertz: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalHertz[];
    public selectedElectricalHertz: DescriptorInterfacesAHU.Electrical.IDescriptorElectricalHertz = null;

    @Output()
    changeViewFan: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(TOKEN_IDescriptorStoreAHU) private _storeAHU: IDescriptorStoreAHU)
    {
        this.disabledFanView = false;
        this.isInvalidNumber = true;
    }


    public onToggleModalClicked(): void
    {
    }

    ngAfterViewInit()
    {
    }

    private populateFanRatingData()
    {

        this.fanDriveType = this._storeAHU.Fan.FanDriveType.list();
        this.selectedFanDriveType = this._storeAHU.Fan.FanDriveType.default();

        this.fanMotorManufacturer = this._storeAHU.Motor.MotorManufacturer.list();
        this.selectedFanMotorManufacturer = this._storeAHU.Motor.MotorManufacturer.default();

        this.electricalVoltage = this._storeAHU.Electrical.ElectricalVoltage.list();
        this.selectedElectricalVoltage = this._storeAHU.Electrical.ElectricalVoltage.default();

        this.electricalPhase = this._storeAHU.Electrical.ElectricalPhase.list();
        this.selectedElectricalPhase = this._storeAHU.Electrical.ElectricalPhase.default();

        this.electricalHertz = this._storeAHU.Electrical.ElectricalHertz.list();
        this.selectedElectricalHertz = this._storeAHU.Electrical.ElectricalHertz.default();;

        this.fanClass = this._storeAHU.Fan.FanClass.list();
        this.selectedFanClass = this._storeAHU.Fan.FanClass.default();
    }

    ngOnInit(): void 
    {
        this.populateFanRatingData()
    }

    setTwoNumberDecimal(myValue: any)
    {
        myValue.target.value = parseFloat(myValue.target.value).toFixed(2);
        this.tspbox = this.espbox + this.ispbox;
    }

    isNumberKey(event: KeyboardEvent)
    {
        if (event.keyCode === 69)
        {
            return false;
        };
    }

    validateEspNumber(value: string): void
    {

        let isNonNumber = Number.parseFloat(value) === NaN || value === null || Number.parseFloat(value) === 0;
        this.isInvalidNumber = !isNonNumber;
        this.tspbox = Number.parseFloat(value);
        if (isNonNumber)
        {
            this.espbox = 0;
            this.tspbox = 0;
        }
        this.isInvalidNumber = this.tspbox <= 0;
        let model = {
            'isInvalidNumber': this.isInvalidNumber,
            'tspBox': this.tspbox
        };
        this.changeViewFan.emit(model);
    }

    debugModel() {
        console.log('TEST THIS');
        console.log(this.fan);
        console.log(this._storeAHU);
        console.log(this.motor);
       
    }
}