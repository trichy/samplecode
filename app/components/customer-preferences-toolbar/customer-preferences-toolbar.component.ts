import { Component, OnInit, ViewChild, ElementRef, Inject, Output, EventEmitter, Input} from '@angular/core';
import { CustomerPreferencesChangeComponent } from '../customer-preferences-change/customer-preferences-change.component';

@Component({
    selector: 'app-customer-preferences-toolbar',
    templateUrl: './customer-preferences-toolbar.component.html',
    styleUrls: ['./customer-preferences-toolbar.component.css']
})
    
export class CustomerPreferencesToolBarComponent implements OnInit {

    showSave: boolean;
    showPreferences: boolean; 
    showCategories: boolean;    
    catTop: number;
    catLeft: number;
 
    @ViewChild('buttonCat')
    private buttonCat: ElementRef; 

    @Input()
    public cate: any;

    public category: any; // lihua: for passing the object
    @Output()
    protected myEvent: EventEmitter<any> = new EventEmitter();

    
    constructor(
            //    @Inject(TOASTR_TOKEN) private toastr: Toastr
    ) {       
    } 
    
    ngOnInit(): void {  
        this.showSave = false;
        this.showPreferences = false;
        this.showCategories = false;
    }

    showSavePreferences(): void {
        this.showSave = true;
    }

    hideSavePreference(): void {
        this.showSave = false;
    }

    showCustomerCategories(): void {
        this.showCategories = true;

        var str = JSON.stringify(this.cate); // lihua: remove binding automatically
        this.category = JSON.parse(str);
    }

    hideCustomerCategories(): void {
        this.showCategories = false;
    }

    applyChanges(): void { // lihua: seprate the applyChanges and closePopupWindow
        this.myEvent.emit(this.category);
        this.showCategories = false;
    }

    showCustomerPreferences(): void {
        this.showPreferences = true;        
    }

    hideCustomerPreferences(): void {
        this.showPreferences = false;
    }

    toastrClick(): void {
       // this.toastr.error('Helo');
    }
} 