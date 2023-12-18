import { Injectable } from '@angular/core';

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
}

export interface Game {
  id: number
  title: string
}