import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsEditComponent } from './game-details-edit.component';

describe('GameDetailsEditComponent', () => {
  let component: GameDetailsEditComponent;
  let fixture: ComponentFixture<GameDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
