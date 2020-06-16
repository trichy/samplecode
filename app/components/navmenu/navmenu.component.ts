import {
    Component,
    ViewChild,
    Inject,
    OnInit
} from "@angular/core";
import { CUtility } from "@jci-ahu/shared.utility";
import { ToastrService } from '../../common/toastr/toastr.service';
import { SessionDataListService } from '../../core/session-data-list/session-data-list.service';
import { ModelAccessService } from "@jci-ahu/services.data-access";
import { WorkingDataService } from "../../services/working-data.service"; 

@Component
    ({
        selector: 'nav-menu',
        templateUrl: './navmenu.component.html',
        styleUrls: ['./navmenu.component.css']
    })
export class NavMenuComponent implements OnInit {
    showModal: boolean = false;
    showReturnModal: boolean = false;
    strModelText: String = "Unit Configuration";
    strModelTextEstimate: String = "Changes not saved.";
    showCustomerPreference: boolean;
    inProcess: boolean = false;

    constructor(
        private _toastrService: ToastrService,
        private _SessionDataListService: SessionDataListService,
        private _modelAccess: ModelAccessService,
        private _workingData: WorkingDataService,
        @Inject('SHOW_CUSTOMER_PREFERENCES') private _showCustomerPreferences: string) {

        this._workingData.showCustomerPreferences = _showCustomerPreferences === "1";
    }

    get showDebugComponent(): boolean {
        return this._workingData.showDebugComponent;
    }

    get showCustomerPeferences(): boolean {
        return this._workingData.showCustomerPreferences;
    }
    haveUnitConfiguration(): boolean {
        return (this._workingData.WorkingUnit !== null);
    }
    
    ngOnInit(): void{
    }

    tabSelect(text: any) {
        this.strModelText = text;
    }

    async onSave() {
        try {
            this.inProcess = true;

            this._workingData.selNavItemID = await this._modelAccess.SaveUnit(
                this._workingData.selNavSessionToken,
                this._workingData.selNavItemID,
                this._workingData.WorkingUnit.model);

            this.showModal = true;
        }
        finally {
            this.inProcess = false;
        }
    }

    toggleModalView() {
        this.showModal = !this.showModal;
    }

    public toggleReturnModal(): void {
        if (this._workingData.WorkingUnit) {
            this.showReturnModal = !this.showReturnModal;
        }
        else {
            this.goToEstimate();
        }
    }

    public returnToEstimate(value : boolean): void {   
        if (value) {   
            this.goToEstimate();
        }
        else {
            this.showReturnModal = value;
        }
    }

    private goToEstimate(): void {
        let sessionUrl = this._SessionDataListService.getSeessionData();
        window.location.replace(sessionUrl);
    }
}
