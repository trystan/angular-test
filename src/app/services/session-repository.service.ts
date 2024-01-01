import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { InMemoryRepository } from '../util/in-memory-repository';

@Injectable({
  providedIn: 'root'
})
export class SessionRepositoryService {
  private repository = new InMemoryRepository<Session>([
    { id: 0, title: 'Pizza party',
      date: new Date(2023, 11, 17),
      plays: [
      { game: 'For Sale',
        players: ['Trystan', 'Rachel', 'Mark', 'Jess'], 
        notes: 'A rare tie between Trystan and Rachel.'},
      { game: 'For Sale',
        players: ['Trystan', 'Rachel', 'Mark', 'Jess'], 
        notes: 'Mark\'s "buy the cheepest property" strategy didn\'t work for him but Rachel managed to win by 1.'},
      { game: 'Cosmic Encounter',
        players: ['Trystan', 'Rachel', 'Mark', 'Melissa', 'Jess'], 
        notes: 'A close game where Rachel and Jess won at the last minute with a negotiation.'}],
      notes: 'Some notes' },
  ])

  getSessions(): Observable<Session[]> {
    return this.repository.getAll()
  }
  
  getSession(id: number): Session | null {
    return this.repository.getById(id)
  }
  
  addSession(newSession: Omit<Session, 'id'>): Session {
    return this.repository.add(newSession)
  }

  updateSession(session: Session): void {
    this.repository.update(session)
  }

  deleteSession(sessionId: number): void {
    this.repository.deleteById(sessionId)
  }
}
