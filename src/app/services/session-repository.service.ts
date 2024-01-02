import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';
import { InMemoryRepository } from './in-memory-repository.service';

@Injectable({
  providedIn: 'root'
})
export class SessionRepositoryService {
  constructor(private repository: InMemoryRepository<Session>) {
    this.repository.load([
      { id: 0, title: 'Pizza party',
        date: new Date(2023, 10, 19),
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
      { id: 1, title: 'Trystan plays alone',
        date: new Date(2023, 11, 17),
        plays: [
        { game: 'Race For The Galaxy',
          players: ['Trystan'], 
          notes: 'Trystan lost his first game vs 2 ai opponents.'},
        { game: 'Race For The Galaxy',
          players: ['Trystan'], 
          notes: 'Trystan won his second game vs 2 ai opponents with a strong Novel World trade strategy.'},
        { game: 'Terraforming Mars',
          players: ['Trystan'], 
          notes: 'Trystan just barely won vs 2 ai players by focusing on cities, forests, and space projects because of all the free titanium.'},
        { game: 'Matgic The Gathering (Arena)',
          players: ['Trystan'], 
          notes: 'Trystan somehow defeated an another player using a premade red/white deck with strange equiment synergies.'}],
        notes: 'December is busy and no one was able to make it to today\'s boardgame day. Rachel and Trystan had to drink all the USS Richmond punch on their own.' },
    ])
  }

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
