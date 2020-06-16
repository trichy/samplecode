import { Component, OnInit } from '@angular/core';

@Component({

    selector: 'unit-configuration-coil',
    templateUrl: './unit-configuration-coil.component.html',
    styleUrls: ['./unit-configuration-coil.component.css']
})

export class UnitConfigurationCoilComponent implements OnInit {

    public tagName: string = '<tag>';
    showModal: boolean;
    constructor() {
    }

    ngOnInit(): void {
    }

    toggleModalView() {
        this.showModal = !this.showModal;
    }
}