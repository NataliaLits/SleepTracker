import { Component, ViewChild }           from '@angular/core';
import { HistoryTableComponent }          from './history-table/history-table.component';
import { SleepChartComponent }            from './sleep-chart/sleep-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HistoryTableComponent) historyTable!: HistoryTableComponent;
  @ViewChild(SleepChartComponent)   sleepChart!:   SleepChartComponent;

  /**
   * Этот метод вызовется, когда форма сохранит запись.
   * Мы просто переинициализируем дочерние компоненты,
   * чтобы они получили новые данные из SleepService.
   */
  onRecordSaved(): void {
    this.historyTable.ngOnInit();
    this.sleepChart.ngOnInit();
  }
}
