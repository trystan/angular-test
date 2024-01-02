import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameRepositoryService } from 'src/app/services/game-repository.service';

@Component({
  selector: 'app-game-details-edit',
  templateUrl: './game-details-edit.component.html',
  styleUrls: ['./game-details-edit.component.css']
})
export class GameDetailsEditComponent implements OnInit, OnDestroy {
  public game: Game | null = null
  public form: FormGroup = new FormGroup({ }); // prevent warning
  private routeSub: Subscription | null = null
  private gameSub: Subscription | null = null

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private repo: GameRepositoryService,
      private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      starRating: [1],
      notes: ['']
    })

    this.routeSub = this.activatedRoute.params.subscribe((params: any) => {
      this.gameSub = this.repo.getById(Number(params.id)).subscribe(game => {
        this.game = game
        if (this.game) {
          this.form.controls['title'].setValue(this.game.title)
          this.form.controls['starRating'].setValue(this.game.starRating)
          this.form.controls['notes'].setValue(this.game.notes)
        }
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

  onSubmit() {
    if (this.form.valid) {
      this.repo.update({
        id: this.game!.id,
        title: this.form.value.title,
        starRating: this.form.value.starRating,
        notes: this.form.value.notes
      })
      this.router.navigate(['games', this.game!.id]);
    } else {
      // TODO
    }
  }

  deleteGame(): void {
    this.repo.deleteById(this.game!.id)
    this.router.navigate(['/'])
  }
}
