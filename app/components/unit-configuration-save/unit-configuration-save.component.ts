import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, Output, EventEmitter} from '@angular/core'; 
import { ModalComponent } from '../../shared/ui/modal/modal.component';
//import { UnitConfigurationComponent } from '../unit-configuration/unit-configuration.component';
import { unitConfiguration } from '../../core/model/unitConfiguration';
import { UnitConfigurationService } from '../../core/unit-configuration/unitConfiguration.service';


@Component({
    selector: 'unit-configuration-save',
    templateUrl: './unit-configuration-save.component.html',
    styleUrls: ['./unit-configuration-save.component.css']
})
export class UnitConfigurationSaveComponent implements OnInit {

	@Input() modelText: string;
	@Output() onClose = new EventEmitter<any>();
    showModal: boolean = false;
    
	// constructor(@Inject(UnitConfigurationComponent) private unitConfig: UnitConfigurationComponent, private unitConfigurationService: UnitConfigurationService) { }
	constructor() { }

    ngOnInit() : void {

    }

    ngAfterViewInit() : void {
        
    }
    
    public onCloseModalClicked() : void {
       // this.unitConfig.toggleModalView();
		this.onClose.emit(true);
    }

    public btnSaveClicked() : void {
        // this.unitConfig.toggleModalView();
		this.onClose.emit(true);
    }
}
