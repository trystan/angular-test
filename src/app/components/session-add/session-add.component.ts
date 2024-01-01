import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.css']
})
export class SessionAddComponent {
  public form: FormGroup

  constructor(
      private router: Router,
      private repo: SessionRepositoryService,
      private formBuilder: FormBuilder) {
      
    const today = new Date()
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      notes: [''],
      plays: this.formBuilder.array([])
    })
  }

  get playsArray() {
    return this.form.controls["plays"] as FormArray;
  }

  addPlay() {
    const playForm = this.formBuilder.group({
      game: ['', Validators.required],
      players: ['', Validators.required],
      notes: ['', []],
    })
    this.playsArray.push(playForm)
  }

  removePlay(index: number) {
    this.playsArray.removeAt(index)
  }

  onSubmit() {
    if (this.form.valid) {
      const date = this.form.value.date
      const session = this.repo.addSession({ 
        title: this.form.value.title,
        date: new Date(date.year, date.month - 1, date.day),
        notes: this.form.value.notes,
        plays: this.playsArray.value.map((playForm: any) => ({
          game: playForm.game,
          players: (playForm.players as string).split(',').map(p => p.trim()),
          notes: playForm.notes
        }))
      })
      this.router.navigate(['/sessions', session.id]);
    } else {
      // TODO
    }
  }
}
