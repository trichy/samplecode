import { Component, OnInit, Inject, OnChanges, ViewChild, Input, SimpleChanges, Output, EventEmitter} from '@angular/core'; 
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { FanSegmentOptionComponent } from '../fan-segment-option/fan-segment-option.component'; 
import { igGridCfg } from '../../models/igGrid/igGridCfg.model';
import { SampleService } from '../../services/sample.service';
import { validateConfig } from '@angular/router/src/config';
 
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';  
import * as DescriptorsAHU from "@jci-ahu/data.ahu.descriptors";
import { DescriptorStoreAHUService } from "@jci-ahu/data.ahu.descriptor-store";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";

@Component({
    selector: 'fan-rating-modal',
    templateUrl: './fan-rating-modal.component.html',
    styleUrls: ['./fan-rating-modal.component.css']
})

export class FanRatingModalComponent implements OnInit
{
   
    espbox: number = 0.00;
    ispbox: number = 0.00;
    tspbox: number = this.espbox + this.ispbox; 
    public disabledFanView: boolean;
    public isInvalidNumber: boolean = true;

    public fanDriveType: DescriptorsAHU.Fan.CDescriptorFanDriveType[] = [];
    public selectedFanDriveType: DescriptorsAHU.Fan.CDescriptorFanDriveType = null;

    public fanMotorManufacturer: DescriptorsAHU.Motor.CDescriptorMotorManufacturer[] = [];
    public selectedFanMotorManufacturer: DescriptorsAHU.Motor.CDescriptorMotorManufacturer = null;

    public fanClass: DescriptorsAHU.Fan.CDescriptorFanClass[];
    public selectedFanClass: DescriptorsAHU.Fan.CDescriptorFanClass = null;

    public electricalVoltage: DescriptorsAHU.Electrical.CDescriptorElectricalVoltage[];
    public selectedElectricalVoltage: DescriptorsAHU.Electrical.CDescriptorElectricalVoltage = null;

    public electricalPhase: DescriptorsAHU.Electrical.CDescriptorElectricalPhase[];
    public selectedElectricalPhase: DescriptorsAHU.Electrical.CDescriptorElectricalPhase = null;

    public electricalHertz: DescriptorsAHU.Electrical.CDescriptorElectricalHertz[];
    public selectedElectricalHertz: DescriptorsAHU.Electrical.CDescriptorElectricalHertz = null;

    public websiteBaseUrl = '';

    @Output()
    changeViewFan: EventEmitter<any> = new EventEmitter<any>();

     constructor(     
        private sampleService: SampleService,
        @Inject('BASE_APP_API_URL') baseUrl: string,
        private _STORE_AHU: DescriptorStoreAHUService)
    {        

        this.disabledFanView = false;
        this.websiteBaseUrl = baseUrl;    
         this.isInvalidNumber = true;
    }


    public onToggleModalClicked(): void {     
    }

    ngAfterViewInit() { 
    }

    private populateFanRatingData() {

        this.fanDriveType = this._STORE_AHU.Fan.FanDriveTypeList;
        this.selectedFanDriveType = this._STORE_AHU.Fan.DefaultFanDriveType;

        this.fanMotorManufacturer = this._STORE_AHU.Motor.MotorManufacturerList;
        this.selectedFanMotorManufacturer = this._STORE_AHU.Motor.DefaultMotorManufacturer;

        this.electricalVoltage = this._STORE_AHU.Electrical.ElectricalVoltageList;
        this.selectedElectricalVoltage = this._STORE_AHU.Electrical.DefaultElectricalVoltage;

        this.electricalPhase = this._STORE_AHU.Electrical.ElectricalPhaseList;
        this.selectedElectricalPhase = this._STORE_AHU.Electrical.DefaultElectricalPhase;

        this.electricalHertz = this._STORE_AHU.Electrical.ElectricalHertzList;
        this.selectedElectricalHertz = this._STORE_AHU.Electrical.DefaultElectricalHertz;

        this.fanClass = this._STORE_AHU.Fan.FanClassList;
        this.selectedFanClass = this._STORE_AHU.Fan.DefaultFanClass;
    }

    ngOnInit(): void 
    {
        this.populateFanRatingData()
    }

    setTwoNumberDecimal(myValue: any) {
        myValue.target.value = parseFloat(myValue.target.value).toFixed(2);
        this.tspbox = this.espbox + this.ispbox;
    }

    isNumberKey(event: KeyboardEvent) {
        if (event.keyCode === 69) {
            return false;
        };
    }

    validateEspNumber(value: string): void {
       
        let isNonNumber = Number.parseFloat(value) === NaN || value === null || Number.parseFloat(value) === 0;
        this.isInvalidNumber = !isNonNumber;
        this.tspbox = Number.parseFloat(value);
        if (isNonNumber) {
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


}
