import { Observable, Subject } from 'rxjs';

export class InMemoryRepository<T extends { id: number }> {
  private data: T[] = []

  private data$ = new Subject<T[]>()

  constructor(initialData?: T[]) {
    if (initialData) {
      this.data = initialData
      
      // HACK: Not sure why this didn't work without setTimeout. But I don't feel
      // too bad since if this was a real service this would be async and rely on
      // a REST endpoint or something.
      setTimeout(() => {
        this.data$.next(this.data)
      }, 1);
    }
  }

  getAll(): Observable<T[]> {
    return this.data$
  }
  
  getById(id: number): T | null {
    return this.data.find(s => s.id === id) ?? null
  }
  
  add(source: Omit<T, 'id'>): T {
    const maxId = Math.max.apply(Math, this.data.map(g => g.id))
    const newThing: T = ({ ...source, id: isFinite(maxId) ? maxId + 1 : 0 } as any)
    this.data.push(newThing)
    this.data$.next(this.data)
    return newThing
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
