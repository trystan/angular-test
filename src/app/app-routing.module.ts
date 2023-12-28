import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { GameDetailsEditComponent } from './components/game-details-edit/game-details-edit.component';
import { SessionDetailsComponent } from './components/session-details/session-details.component';
import { SessionAddComponent } from './components/session-add/session-add.component';
import { SessionDetailsEditComponent } from './components/session-details-edit/session-details-edit.component';

const routes: Routes = [
  { path: 'games/add', component: AddGameComponent },
  { path: 'games/:id/edit', component: GameDetailsEditComponent },
  { path: 'games/:id', component: GameDetailsComponent },
  { path: 'sessions/add', component: SessionAddComponent },
  { path: 'sessions/:id/edit', component: SessionDetailsEditComponent },
  { path: 'sessions/:id', component: SessionDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
