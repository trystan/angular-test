import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRepository<T extends { id: number }> {
  private data: T[] = []

  private data$ = new BehaviorSubject<T[]>([])

  constructor(private httpClient: HttpClient) {
  }

  load(data: T[]): void {
    this.data = data
    this.data$.next(this.data)
  }

  loadFromFile(url: string): void {
    this.httpClient
      .get<{ data: T[] }>(url)
      .subscribe(response => {
        this.load(response.data)
      })
  }

  getAll(): Observable<T[]> {
    return this.data$ // .asObservable()
  }
  
  getById(id: number): T | null {
    const existing = this.data.find(s => s.id === id) ?? null
    return existing ? { ...existing } : null
  }
  
  add(source: Omit<T, 'id'>): T {
    const maxId = Math.max.apply(Math, this.data.map(g => g.id))
    const newThing: T = ({ ...source, id: isFinite(maxId) ? maxId + 1 : 0 } as any)
    this.data.push(newThing)
    this.data$.next(this.data)
    return { ...newThing }
  }

  update(thing: T): void {
    const index = this.data.findIndex(g => g.id === thing.id)
    if (index > -1) {
      this.data.splice(index, 1, thing)
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
