import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWorkout } from './member-workout';

describe('MemberWorkout', () => {
  let component: MemberWorkout;
  let fixture: ComponentFixture<MemberWorkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberWorkout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberWorkout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
