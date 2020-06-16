import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core'; 
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { CustomerPreferencesToolBarComponent } from '../customer-preferences-toolbar/customer-preferences-toolbar.component';
 
@Component({
    selector: 'customer-preferences-save',
    templateUrl: './customer-preferences-save.component.html',
    styleUrls: ['./customer-preferences-save.component.css']
})
export class CustomerPreferencesSaveComponent implements OnInit {

    
    constructor( @Inject(CustomerPreferencesToolBarComponent) private toolBar: CustomerPreferencesToolBarComponent) { }

    ngOnInit() : void {

    }

    ngAfterViewInit() : void {
        
    }
    
    public onCloseModalClicked() : void {
        this.toolBar.hideSavePreference();
    }

    public btnSaveClicked() : void {
        this.toolBar.hideSavePreference();
        console.log('Save Data');
    }
}
