import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  private games = [
    { id: 0, title: 'Cosmic Encounter' },
    { id: 1, title: 'For Sale' },
    { id: 2, title: 'Gravwell' },
    { id: 3, title: 'Root' },
    { id: 4, title: 'Inis' },
    { id: 5, title: 'Terraforming Mars' },
  ]

  private games$ = new Subject<Game[]>()

  constructor() {
    // HACK: Not sure why this didn't work without setTimeout. But I don't feel
    // too bad since if this was a real service this would be async and rely on
    // a REST endpoint or something.
    setTimeout(() => {
      this.games$.next(this.games)
    }, 1)
  }

  getGames(): Observable<Game[]> {
    return this.games$
  }

  getGame(id: number): Game | null {
    return this.games.find(g => g.id === id) ?? null
  }

  addGame(newGame: { title: string }): Game {
    const maxId = Math.max.apply(Math, this.games.map(g => g.id))
    const game: Game = { id: maxId + 1, title: newGame.title }
    this.games.push(game)
    this.games$.next(this.games)
    return game
  }

  updateGame(game: Game): void {
    const index = this.games.findIndex(g => g.id === game.id)
    if (index > -1) {
      this.games.splice(index, 1, game)
      this.games$.next(this.games)
    }
  }
}
