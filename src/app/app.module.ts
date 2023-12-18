import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameListComponent } from "./components/game-list/game-list.component";
import { AddGameComponent } from './components/add-game/add-game.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        GameDetailsComponent,
        AddGameComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GameListComponent,
        ReactiveFormsModule
    ]
})
export class AppModule { }
