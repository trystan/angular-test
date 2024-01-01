import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameListComponent } from "./components/game-list/game-list.component";
import { AddGameComponent } from './components/add-game/add-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameDetailsEditComponent } from './components/game-details-edit/game-details-edit.component';
import { NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionListComponent } from './components/session-list/session-list.component';
import { SessionAddComponent } from './components/session-add/session-add.component';
import { SessionDetailsComponent } from './components/session-details/session-details.component';
import { SessionDetailsEditComponent } from './components/session-details-edit/session-details-edit.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
    declarations: [
        AppComponent,
        GameDetailsComponent,
        AddGameComponent,
        GameDetailsEditComponent,
        SessionAddComponent,
        SessionDetailsComponent,
        SessionDetailsEditComponent,
        WelcomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GameListComponent,
        SessionListComponent,
        ReactiveFormsModule,
        NgbRatingModule,
        NgbDatepickerModule
    ]
})
export class AppModule { }
