import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective }           from 'ng2-charts';
import { SleepService, SleepSession }   from '../sleep.service';

@Component({
  selector: 'app-sleep-chart',
  templateUrl: './sleep-chart.component.html',
  styleUrls: ['./sleep-chart.component.scss']
})
export class SleepChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Sleep Hours', fill:false, borderColor:'#8e24aa', tension:0.4 },
      { data: [], label: 'Ideal (8h)',   fill:false, borderColor:'green',   borderDash:[5,5] }
    ]
  };
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales:{ y:{ min:0, max:12, ticks:{ stepSize:1 } } }
  };

  constructor(private sleepService: SleepService) {}

  ngOnInit(): void {
    this.sleepService.getAll().subscribe({
      next: (data: SleepSession[]) => {
        const sorted = data.sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
        const hours  = sorted.map(s=>this.computeHours(s.startTime,s.endTime));
        this.chartData.labels = sorted.map(s=>s.date);
        this.chartData.datasets[0].data = hours;
        this.chartData.datasets[1].data = hours.map(()=>8);
        this.chart?.update();
      }
    });
  }

  private computeHours(a:string,b:string):number {
    const [ah,am]=a.split(':').map(Number);
    const [bh,bm]=b.split(':').map(Number);
    let start=ah+am/60,end=bh+bm/60;
    if(end<start) end+=24;
    return +(end-start).toFixed(2);
  }
}
