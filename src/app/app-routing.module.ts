import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { AddGameComponent } from './components/add-game/add-game.component';

const routes: Routes = [
  { path: 'games/add', component: AddGameComponent },
  { path: 'games/:id', component: GameDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
