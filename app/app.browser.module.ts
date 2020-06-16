import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUIModule } from './shared/sharedui.module';
import { UserInformationService } from './core/debug/debug.service';
import { UnitConfigurationService } from './core/unit-configuration/unitConfiguration.service';
import { DevCookieService } from './services/cookie.service'; 

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedUIModule,
        AppModuleShared  
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }, 
        UserInformationService,
        UnitConfigurationService,
        DevCookieService
    ]
})
export class AppModule {
}

export function getBaseUrl() {

 
    var baseUrl = document.getElementsByTagName('base')[0].href;

    //strip trailing "/"
    if (baseUrl.substring(baseUrl.length - 1) == '/') {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    return baseUrl;
}
