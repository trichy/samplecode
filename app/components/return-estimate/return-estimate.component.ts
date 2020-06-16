import { Component,  Input, Output, EventEmitter} from '@angular/core'; 
 
@Component({
    selector: 'return-estimate-modal',
    templateUrl: './return-estimate.component.html',
    styleUrls: ['./return-estimate.component.css']
})
export class ReturnEstimateComponent {

	@Input() modelText: string;
	@Output() onClose = new EventEmitter<any>();
    showModal: boolean = false;
    
	constructor() { }
 
    public onCloseModalClicked() : void {
       this.onClose.emit(false);
    }

    public returnToEstimate(): void {
        this.onClose.emit(true);
    }
}
