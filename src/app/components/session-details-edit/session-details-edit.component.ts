import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  public myForm: FormGroup = new FormGroup({ }); // prevent warning

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private repo: SessionRepositoryService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      notes: new FormControl('')
    });

    this.activatedRoute.params.subscribe((params: any) => {
      this.session = this.repo.getSession(parseInt(params.id, 10))
      this.myForm = new FormGroup({
        title: new FormControl(this.session!.title),
        notes: new FormControl(this.session!.notes)
      });
    })
  }
  
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.repo.updateSession({
        id: this.session!.id,
        title: form.value.title,
        notes: form.value.notes
      })
      this.router.navigate(['sessions', this.session!.id]);
    } else {
      // TODO
    }
  }

  deleteSession(): void {
    this.repo.deleteSession(this.session!.id)
    this.router.navigate(['/'])
  }
}
