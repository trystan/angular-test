import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  private games: Game[] = [
    { id: 0, title: 'Cosmic Encounter' },
    { id: 1, title: 'For Sale' },
    { id: 2, title: 'Gravwell' },
    { id: 3, title: 'Root' },
    { id: 4, title: 'Inis' },
    { id: 5, title: 'Terraforming Mars' },
  ]

  constructor() { }

  getGames(): Game[] {
    return [ ...this.games ] // don't let the caller modify the data
  }

  getGame(id: number): Game | null {
    return this.games.find(g => g.id === id) ?? null
  }

  addGame(newGame: { title: string }): Game {
    const game: Game = { id: this.games.length, title: newGame.title }
    this.games.push(game)
    return game
  }
}
