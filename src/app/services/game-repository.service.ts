import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Observable, Subject } from 'rxjs';
import { InMemoryRepository } from '../util/in-memory-repository';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  private repository = new InMemoryRepository<Game>([
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
  ])

  getGames(): Observable<Game[]> {
    return this.repository.getAll()
  }

  getGame(id: number): Game | null {
    return this.repository.getById(id)
  }

  addGame(newGame: Omit<Game, 'id'>): Game {
    return this.repository.add(newGame)
  }

  updateGame(game: Game): void {
    this.repository.update(game)
  }

  deleteGame(gameId: number): void {
    this.repository.deleteById(gameId)
  }
}
