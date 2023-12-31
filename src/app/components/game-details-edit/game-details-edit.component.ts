import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameRepositoryService } from 'src/app/services/game-repository.service';

@Component({
  selector: 'app-game-details-edit',
  templateUrl: './game-details-edit.component.html',
  styleUrls: ['./game-details-edit.component.css']
})
export class GameDetailsEditComponent {
  public game: Game | null = null
  public form: FormGroup = new FormGroup({ }); // prevent warning

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

    this.activatedRoute.params.subscribe((params: any) => {
      this.game = this.repo.getGame(parseInt(params.id, 10))
      this.form.controls['title'].setValue(this.game!.title)
      this.form.controls['starRating'].setValue(this.game!.starRating)
      this.form.controls['notes'].setValue(this.game!.notes)
    })
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.repo.updateGame({
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
    this.repo.deleteGame(this.game!.id)
    this.router.navigate(['/'])
  }
}
