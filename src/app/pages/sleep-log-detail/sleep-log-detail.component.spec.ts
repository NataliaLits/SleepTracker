import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogDetailComponent } from './sleep-log-detail.component';

describe('SleepLogDetailComponent', () => {
  let component: SleepLogDetailComponent;
  let fixture: ComponentFixture<SleepLogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
