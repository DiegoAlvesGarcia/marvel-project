import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { ErrorComponent } from './pages/error/error.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LocalLoaderComponent } from './shared/components/local-loader/local-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    ErrorComponent,
    CharacterDetailsComponent,
    LoaderComponent,
    LocalLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
