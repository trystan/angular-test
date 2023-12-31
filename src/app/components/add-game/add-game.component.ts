import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameRepositoryService } from 'src/app/services/game-repository.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {
  public form: FormGroup = new FormGroup({ }); // prevent warning

  constructor(
      private router: Router,
      private repo: GameRepositoryService,
      private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      starRating: [1],
      notes: ['']
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const game = this.repo.addGame({ 
        title: this.form.value.title,
        starRating: this.form.value.starRating,
        notes: this.form.value.notes
      })
      this.router.navigate(['/games', game.id]);
    } else {
      // TODO
    }
  }
}
