import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.css']
})
export class SessionAddComponent implements OnInit {
  public myForm: FormGroup = new FormGroup({ }); // prevent warning

  constructor(private router: Router, private repo: SessionRepositoryService) {

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      notes: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const session = this.repo.addSession({ 
        title: form.value.title,
        notes: form.value.notes
      })
      this.router.navigate(['/sessions', session.id]);
    } else {
      // TODO
    }
  }
}
