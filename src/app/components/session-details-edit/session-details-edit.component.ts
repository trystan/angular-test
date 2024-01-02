import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/models/session';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-details-edit',
  templateUrl: './session-details-edit.component.html',
  styleUrls: ['./session-details-edit.component.css']
})
export class SessionDetailsEditComponent implements OnInit, OnDestroy {
  public session: Session | null = null
  public form: FormGroup
  private routeSub: Subscription | null = null
  private sessionSub: Subscription | null = null

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private repo: SessionRepositoryService,
      private formBuilder: FormBuilder) {

    const today = new Date()
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      notes: [''],
      plays: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params: any) => {
      this.sessionSub = this.repo.getById(Number(params.id)).subscribe(session => {
        this.session = session
        if (this.session) {
          const dateObject = { year: this.session.date.getUTCFullYear(), month: this.session.date.getUTCMonth() + 1, day: this.session.date.getUTCDate() }
          this.form = this.formBuilder.group({
            title: [this.session.title, Validators.required],
            date: [dateObject, Validators.required],
            notes: [this.session!.notes, Validators.required],
            plays: this.formBuilder.array(this.session.plays.map(p => this.formBuilder.group({
              game: [p.game, Validators.required],
              players: [p.players.join(', '), Validators.required],
              notes: [p.notes, []]
            })))
          });
        }
      })
    })
  }
  
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if (this.sessionSub) {
      this.sessionSub.unsubscribe()
    }
  }
  
  onSubmit() {
    if (this.session && this.form.valid) {
      const date = this.form.value.date
      this.repo.update({
        id: this.session!.id,
        title: this.form.value.title,
        date: new Date(date.year, date.month - 1, date.day),
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
    this.repo.deleteById(this.session!.id)
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
