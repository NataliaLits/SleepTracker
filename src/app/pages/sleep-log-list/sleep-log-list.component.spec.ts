import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogListComponent } from './sleep-log-list.component';

describe('SleepLogListComponent', () => {
  let component: SleepLogListComponent;
  let fixture: ComponentFixture<SleepLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
