import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepLogService } from '../../services/sleep-log.service';
import { SleepLog } from '../../models/sleep-log.model';

@Component({
  selector: 'app-sleep-log-list',
  templateUrl: './sleep-log-list.component.html',
  styleUrls: ['./sleep-log-list.component.scss']
})
export class SleepLogListComponent implements OnInit {
  public logs: SleepLog[] = [];
  public loading = true;
  public error: string | null = null;

  constructor(
    private service: SleepLogService,
    public  router:  Router
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(
      data => {
        this.logs = data;
        this.loading = false;
      },
      err => {
        this.error = err.message;
        this.loading = false;
      }
    );
  }
}
