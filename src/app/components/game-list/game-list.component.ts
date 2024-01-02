import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GameRepositoryService } from '../../services/game-repository.service';
import { Game } from 'src/app/models/game';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games$: Observable<Game[]> = of([])

  constructor(private repo: GameRepositoryService) {
  }

  ngOnInit(): void {
    this.games$ = this.repo.getAll()
  }
}
