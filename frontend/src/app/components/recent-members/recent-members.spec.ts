import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentMembers } from './recent-members';

describe('RecentMembers', () => {
  let component: RecentMembers;
  let fixture: ComponentFixture<RecentMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentMembers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentMembers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
