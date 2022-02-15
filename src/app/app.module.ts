import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { ErrorComponent } from './pages/error/error.component';
import { HeroDetailsComponent } from './pages/hero-details/hero-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    ErrorComponent,
    HeroDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
