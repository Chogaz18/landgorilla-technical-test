import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: BrowserModule, useClass: BrowserModule },
    AppRoutingModule,
  ],
}).catch((err) => console.error(err));
