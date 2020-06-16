import { Injectable, OnDestroy } from '@angular/core';
import { AddFlatFilterUnit } from '../../models/flat-filter-unit/add-flat-filter-unit.model';
//import { FlatFilterUnitComponent } from '../../components/flat-filter-unit/flat-filter-unit.component';
 
 
@Injectable()
export class AddFlatFilterUnitService implements OnDestroy {

    private _flatFilterUnits: AddFlatFilterUnit[] = null;

    createNewFlatFilter(): void {
        if (this._flatFilterUnits === null) {
            this._flatFilterUnits = [];
        }
        //this._flatFilterUnits.push(new AddFlatFilterUnit(FlatFilterUnitComponent, {}));

        console.log(this._flatFilterUnits);
    }

    getFlatFilterUnits(): AddFlatFilterUnit[] {
        return this._flatFilterUnits;
    }

    removeFlatFiltersUnits(): void {
        this._flatFilterUnits = [];
    }

    ngOnDestroy(): void {
        this._flatFilterUnits = [];
    }
}