import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit {
  public session: Session | null = null

  constructor(
      private activatedRoute: ActivatedRoute,
      private repo: SessionRepositoryService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.repo.getById(Number(params.id)).subscribe(session => {
        this.session = session
      })
    })
  }
}
