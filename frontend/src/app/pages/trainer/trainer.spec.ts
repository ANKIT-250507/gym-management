import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trainer } from './trainer';

describe('Trainer', () => {
  let component: Trainer;
  let fixture: ComponentFixture<Trainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
