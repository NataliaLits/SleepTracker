import { Component, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource }       from '@angular/material/table';

interface SleepSession {
  date:     string;
  duration: string;
  mood:     number;
  emoji:    string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:  ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showForm = false;

  sleepForm: FormGroup;
  displayedColumns: string[] = ['date','duration','mood'];
  dataSource = new MatTableDataSource<SleepSession>([]);

  emojis = [
    { value: 1, symbol: '😞' }, { value: 2, symbol: '😕' },
    { value: 3, symbol: '😐' }, { value: 4, symbol: '🙂' },
    { value: 5, symbol: '😊' }, { value: 6, symbol: '😃' },
    { value: 7, symbol: '😁' }, { value: 8, symbol: '😆' },
    { value: 9, symbol: '🥳' }, { value: 10, symbol: '🤩' },
  ];

  constructor(private fb: FormBuilder) {
    this.sleepForm = this.fb.group({
      date:      [this.today(), Validators.required],
      startTime: ['', Validators.required],
      endTime:   ['', Validators.required],
      mood:      [5    , Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.sleepForm.invalid) return;

    const { date, startTime, endTime, mood } = this.sleepForm.value;
    // Вычисляем длительность
    const start = this.parseTime(startTime);
    const end   = this.parseTime(endTime);
    const durMs = end.getTime() - start.getTime();
    const duration = this.msToHHMM(durMs);

    const emoji = this.emojis.find(e => e.value === mood)?.symbol || '';

    // Добавляем запись в таблицу
    const newRec: SleepSession = { date, duration, mood, emoji };
    this.dataSource.data = [...this.dataSource.data, newRec];

    // Сброс формы (сохранить дату по умолчанию)
    this.sleepForm.patchValue({
      startTime: '', endTime: '', mood: 5
    });
  }

  // Вспомогательные
  private parseTime(t: string): Date {
    const [h, m] = t.split(':').map(Number);
    const d = new Date(this.sleepForm.value.date);
    d.setHours(h, m);
    return d;
  }

  private msToHHMM(ms: number): string {
    const totalMin = Math.round(ms/60000);
    const h = Math.floor(totalMin/60);
    const m = totalMin % 60;
    return `${h}h ${m}m`;
  }

  private today(): string {
    return new Date().toISOString().substring(0,10);
  }
}
