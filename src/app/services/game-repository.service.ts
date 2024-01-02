import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {
  private data: Game[] = []

  private data$ = new BehaviorSubject<Game[]>(this.data)

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<{ data: Game[] }>('/assets/games.json')
      .subscribe(response => {
        this.data = response.data
        this.data$.next(this.data)
      })
  }

  getAll(): Observable<Game[]> {
    return this.data$ // .asObservable()
  }
  
  getById(id: number): Game | null {
    const existing = this.data.find(s => s.id === id) ?? null
    return existing ? { ...existing } : null
  }
  
  add(source: Omit<Game, 'id'>): Game {
    const maxId = Math.max.apply(Math, this.data.map(g => g.id))
    const game: Game = ({ ...source, id: isFinite(maxId) ? maxId + 1 : 0 } as any)
    this.data.push(game)
    this.data$.next(this.data)
    return { ...game }
  }

  update(game: Game): void {
    const index = this.data.findIndex(g => g.id === game.id)
    if (index > -1) {
      this.data.splice(index, 1, game)
      this.data$.next(this.data)
    }
  }

  deleteById(id: number): void {
    const index = this.data.findIndex(g => g.id === id)
    if (index > -1) {
      this.data.splice(index, 1)
      this.data$.next(this.data)
    }
  }
}
