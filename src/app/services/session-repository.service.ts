import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session';
import { HttpClient } from '@angular/common/http';

const convertStringToDate = (value: string | Date) => {
  const realValue = typeof value === 'string' ? value : value.toJSON().split('T')[0]
  const [y,m,d] = realValue.split('-')
  return new Date(Number(y), Number(m) - 1, Number(d))
}

@Injectable({
  providedIn: 'root'
})
export class SessionRepositoryService {
  private data: Session[] = []

  private data$ = new BehaviorSubject<Session[]>(this.data)

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<{ data: Session[] }>('/assets/sessions.json')
      .subscribe(response => {
        response.data.forEach(session => {
          session.date = convertStringToDate(session.date)
        })
        this.data = response.data
        this.data$.next(this.data)
      })
  }

  getAll(): Observable<Session[]> {
    return this.data$
  }
  
  // Observable because this might be called before the data is loaded and needs to be updated.
  // Not sure if this is the Angular way to do this...
  getById(id: number): Observable<Session | null> {
    const existing = this.data.find(s => s.id === id) ?? null
    const subject = new BehaviorSubject<Session | null>(existing ? { ...existing } : null)
    this.data$.subscribe(values => {
      const newValue = values.find(s => s.id === id) ?? null
      subject.next(newValue ? { ...newValue } : null)
    })
    return subject
  }
  
  add(source: Omit<Session, 'id'>): Session {
    const maxId = Math.max.apply(Math, this.data.map(g => g.id))
    const session: Session = ({ ...source, id: isFinite(maxId) ? maxId + 1 : 0 } as any)
    this.data.push(session)
    this.data$.next(this.data)
    return { ...session }
  }

  update(session: Session): void {
    const index = this.data.findIndex(g => g.id === session.id)
    if (index > -1) {
      this.data.splice(index, 1, session)
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
