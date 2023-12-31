import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-details-edit',
  templateUrl: './session-details-edit.component.html',
  styleUrls: ['./session-details-edit.component.css']
})
export class SessionDetailsEditComponent implements OnInit {
  public session: Session | null = null
  public form: FormGroup

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private repo: SessionRepositoryService,
      private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      notes: [''],
      plays: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.session = this.repo.getSession(parseInt(params.id, 10))
      this.form = this.formBuilder.group({
        title: [this.session!.title, Validators.required],
        notes: [this.session!.notes, Validators.required],
        plays: this.formBuilder.array(this.session!.plays.map(p => this.formBuilder.group({
          game: [p.game, Validators.required],
          players: [p.players.join(', '), Validators.required],
          notes: [p.notes, []]
        })))
      });
    })
  }
  
  onSubmit() {
    if (this.session && this.form.valid) {
      const session = this.repo.updateSession({
        id: this.session!.id,
        title: this.form.value.title,
        notes: this.form.value.notes,
        plays: this.playsArray.value.map((playForm: any) => ({
          game: playForm.game,
          players: (playForm.players as string).split(',').map(p => p.trim()),
          notes: playForm.notes
        }))
      })
      this.router.navigate(['/sessions', this.session!.id]);
    } else {
      // TODO
    }
  }

  deleteSession(): void {
    this.repo.deleteSession(this.session!.id)
    this.router.navigate(['/'])
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
}
