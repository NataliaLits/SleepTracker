import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogFormComponent } from './sleep-log-form.component';

describe('SleepLogFormComponent', () => {
  let component: SleepLogFormComponent;
  let fixture: ComponentFixture<SleepLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
