import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameRepositoryService } from '../../services/game-repository.service';
import { Game } from 'src/app/models/game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  public game: Game | null = null
  private routeSub: Subscription | null = null
  private gameSub: Subscription | null = null

  constructor(
      private activatedRoute: ActivatedRoute,
      private repo: GameRepositoryService) {
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params: any) => {
      this.gameSub = this.repo.getById(Number(params.id)).subscribe(game => {
        this.game = game
      })
    })
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe()
    }
  }
}
