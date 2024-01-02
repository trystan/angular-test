import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameRepositoryService } from '../../services/game-repository.service';
import { Game } from 'src/app/models/game';

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
      this.game = this.repo.getById(parseInt(params.id, 10))
    })
  }
}
