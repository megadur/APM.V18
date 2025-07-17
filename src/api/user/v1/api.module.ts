import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { GutachtenportalConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class GutachtenportalApiModule {
    public static forRoot(configurationFactory: () => GutachtenportalConfiguration): ModuleWithProviders<GutachtenportalApiModule> {
        return {
            ngModule: GutachtenportalApiModule,
            providers: [ { provide: GutachtenportalConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: GutachtenportalApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('GutachtenportalApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
