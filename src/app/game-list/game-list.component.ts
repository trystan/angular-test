import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Game, GameRepositoryService } from '../game-repository.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games: Game[] = []

  constructor(private repo: GameRepositoryService) {

  }

  ngOnInit(): void {
      this.games = this.repo.getGames()
  }
}
