import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/models/session';
import { SessionRepositoryService } from 'src/app/services/session-repository.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  public session: Session | null = null
  private routeSub: Subscription | null = null
  private sessionSub: Subscription | null = null

  constructor(
      private activatedRoute: ActivatedRoute,
      private repo: SessionRepositoryService) {
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params: any) => {
      this.sessionSub = this.repo.getById(Number(params.id)).subscribe(session => {
        this.session = session
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
}
