import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionRepositoryService {
  private sessions: Session[] = [
    { id: 0, title: 'Pizza party',
      notes: 'Some notes' },
  ]

  private sessions$ = new Subject<Session[]>()

  constructor() {
    // HACK: Not sure why this didn't work without setTimeout. But I don't feel
    // too bad since if this was a real service this would be async and rely on
    // a REST endpoint or something.
    setTimeout(() => {
      this.sessions$.next(this.sessions)
    }, 1)
  }

  getSessions(): Observable<Session[]> {
    return this.sessions$
  }
  
  getSession(id: number): Session | null {
    return this.sessions.find(s => s.id === id) ?? null
  }
  
  addSession(newSession: Omit<Session, 'id'>): Session {
    const maxId = Math.max.apply(Math, this.sessions.map(g => g.id))
    const session: Session = { ...newSession, id: isFinite(maxId) ? maxId + 1 : 0 }
    this.sessions.push(session)
    this.sessions$.next(this.sessions)
    return session
  }

  updateSession(session: Session): void {
    const index = this.sessions.findIndex(g => g.id === session.id)
    if (index > -1) {
      this.sessions.splice(index, 1, session)
      this.sessions$.next(this.sessions)
    }
  }

  deleteSession(sessionId: number): void {
    const index = this.sessions.findIndex(g => g.id === sessionId)
    if (index > -1) {
      this.sessions.splice(index, 1)
      this.sessions$.next(this.sessions)
    }
  }
}
