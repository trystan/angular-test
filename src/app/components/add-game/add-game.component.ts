import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameRepositoryService } from 'src/app/services/game-repository.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {
  public myForm: FormGroup = new FormGroup({ }); // prevent warning

  constructor(private router: Router, private repo: GameRepositoryService) {

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      starRating: new FormControl(1),
      notes: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const game = this.repo.addGame({ 
        title: form.value.title,
        starRating: form.value.starRating,
        notes: form.value.notes
      })
      this.router.navigate(['/games', game.id]);
    } else {
      // TODO
    }
  }
}
