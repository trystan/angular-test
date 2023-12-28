import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  private games = [
    { id: 0, title: 'Cosmic Encounter', starRating: 5,
      notes: 'Our favorite game!' },
    { id: 1, title: 'For Sale', starRating: 5,
      notes: 'A fast game that anyone can play.' },
    { id: 2, title: 'Gravwell', starRating: 4,
      notes: 'A really neat racing game where everyone tries to second guess what everyone else will do.' },
    { id: 3, title: 'Root', starRating: 2,
      notes: 'Asymetric dudes on a map.' },
    { id: 4, title: 'Inis', starRating: 3,
      notes: 'Trippy artwork.' },
    { id: 5, title: 'Terraforming Mars', starRating: 5,
      notes: 'Terraform mars.' },
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

  addGame(newGame: Omit<Game, 'id'>): Game {
    const maxId = Math.max.apply(Math, this.games.map(g => g.id))
    const game: Game = { ...newGame, id: isFinite(maxId) ? maxId + 1 : 0 }
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

  deleteGame(gameId: number): void {
    const index = this.games.findIndex(g => g.id === gameId)
    if (index > -1) {
      this.games.splice(index, 1)
      this.games$.next(this.games)
    }
  }
}
