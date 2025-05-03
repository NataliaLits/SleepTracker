import { Component, OnInit }    from '@angular/core';
import { MatTableDataSource }    from '@angular/material/table';
import { SleepService, SleepSession } from '../sleep.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {
  displayedColumns: string[] = ['date','duration','mood'];
  dataSource = new MatTableDataSource<SleepSession>([]);

  constructor(private sleepService: SleepService) {}

  ngOnInit(): void {
    this.sleepService.getAll().subscribe({
      next: data => {
        const sorted = data.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
        this.dataSource.data = sorted;
      }
    });
  }
}
