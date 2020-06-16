import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from './ui/toggle/toggle.component';
import { AccordeonComponent } from './ui/accordeon/accordeon.component';
import { CardComponent } from './ui/card/card.component';
import { PannelComponent } from './ui/pannel/pannel.component';
import { ToggleSHComponent } from './ui/toggleSH/toggleSH.component';
import { ModalComponent } from './ui/modal/modal.component';
import { IgGridComponent } from './ui/igGrid/iggrid.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { ToolTipComponent } from './ui/tooltip/tooltip.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
        ToggleComponent,
        AccordeonComponent,
		CardComponent,
		PannelComponent,
		ToggleSHComponent,
		ModalComponent,
		IgGridComponent,
		SpinnerComponent,
		ToolTipComponent
	],
	exports: [
        ToggleComponent,
        AccordeonComponent,
		CardComponent,
		PannelComponent,
		ToggleSHComponent,
		ModalComponent,
		IgGridComponent,
		SpinnerComponent,
		ToolTipComponent
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class SharedUIModule { }
