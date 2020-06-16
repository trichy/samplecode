import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';  
import { UserInformationService } from './core/debug/debug.service';
import { UnitConfigurationService } from './core/unit-configuration/unitConfiguration.service';
import { DevCookieService } from './services/cookie.service';
 
 
@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        //SharedUIModule,
        AppModuleShared     
    ],
    providers: [        
        UserInformationService,
        UnitConfigurationService,
        DevCookieService
    ]
})
export class AppModule {
}
