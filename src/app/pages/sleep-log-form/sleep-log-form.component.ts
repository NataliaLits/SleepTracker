import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SleepLogService } from '../../services/sleep-log.service';
import { SleepLog } from '../../models/sleep-log.model';

@Component({
  selector: 'app-sleep-log-form',
  templateUrl: './sleep-log-form.component.html',
  styleUrls: ['./sleep-log-form.component.scss']
})
export class SleepLogFormComponent implements OnInit {
  // форма
  form = this.fb.group({
    sleepStart: ['', Validators.required],
    sleepEnd:   ['', Validators.required],
    mood:       ['', Validators.required]
  });

  public isEdit = false;
  public id?: number;
  public error: string | null = null;

  constructor(
    private fb:       FormBuilder,
    private service:  SleepLogService,
    public  router:   Router,
    private route:    ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEdit = true;
        this.id = +params.get('id')!;
        this.service.getById(this.id).subscribe(
          log => this.form.patchValue(log),
          err => this.error = err.message
        );
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const dto = this.form.value as Omit<SleepLog, 'id'>;
    if (this.isEdit && this.id != null) {
      this.service.update(this.id, dto).subscribe({
        next: () => this.router.navigate(['/logs']),
        error: err => this.error = err.message
      });
    } else {
      this.service.create(dto).subscribe({
        next: () => this.router.navigate(['/logs']),
        error: err => this.error = err.message
      });
    }
  }
}
