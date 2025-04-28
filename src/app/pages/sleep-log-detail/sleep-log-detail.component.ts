import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SleepLog } from '../../models/sleep-log.model';
import { SleepLogService } from '../../services/sleep-log.service';

@Component({
  selector: 'app-sleep-log-detail',
  templateUrl: './sleep-log-detail.component.html',
  styleUrls: ['./sleep-log-detail.component.scss']
})
export class SleepLogDetailComponent implements OnInit {
  log?: SleepLog;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: SleepLogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.service.getById(id).subscribe(
        (l: SleepLog) => this.log = l,
        (err: any) => this.error = err.message ?? 'Could not load log'
      );
    });
  }
}
