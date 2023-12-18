import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRepositoryService } from '../../services/game-repository.service';

interface Game { id: number; title: string; }

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  public game: Game | null = null

  constructor(
      private activatedRoute: ActivatedRoute,
      private repo: GameRepositoryService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.game = this.repo.getGame(parseInt(params.id, 10))
    })
  }
}
