import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsEditComponent } from './session-details-edit.component';

describe('SessionDetailsEditComponent', () => {
  let component: SessionDetailsEditComponent;
  let fixture: ComponentFixture<SessionDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
