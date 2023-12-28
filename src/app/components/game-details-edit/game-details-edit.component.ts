import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public myForm: FormGroup = new FormGroup({ }); // prevent warning

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private repo: GameRepositoryService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl('')
    });

    this.activatedRoute.params.subscribe((params: any) => {
      this.game = this.repo.getGame(parseInt(params.id, 10))
      this.myForm = new FormGroup({
        title: new FormControl(this.game!.title)
      });
    })
  }
  
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.repo.updateGame({
        id: this.game!.id,
        title: form.value.title
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
