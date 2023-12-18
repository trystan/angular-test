import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameListComponent } from "./game-list/game-list.component";

@NgModule({
    declarations: [
        AppComponent,
        GameDetailsComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GameListComponent
    ]
})
export class AppModule { }
