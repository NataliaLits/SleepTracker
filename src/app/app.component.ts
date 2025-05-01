import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup }        from '@angular/forms';
import { MatTableDataSource }            from '@angular/material/table';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective }           from 'ng2-charts';

interface SleepSession {
  date:     string;
  duration: string;
  mood:     number;
  emoji:    string;
  hours:    number;
}

interface Emoji {
  value: number;
  symbol: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:  ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Форма и её отображение
  sleepForm: FormGroup;
  showForm  = false;

  // Массив эмоджи и выбранное настроение
  selectedMood = 5;
  emojis: Emoji[] = [
    { value: 1,  symbol: '😞', label: 'Terrible'   },
    { value: 2,  symbol: '😕', label: 'Bad'        },
    { value: 3,  symbol: '😐', label: 'Meh'        },
    { value: 4,  symbol: '🙂', label: 'Okay'       },
    { value: 5,  symbol: '😊', label: 'Good'       },
    { value: 6,  symbol: '😃', label: 'Great'      },
    { value: 7,  symbol: '😁', label: 'Awesome'    },
    { value: 8,  symbol: '😆', label: 'Fantastic'  },
    { value: 9,  symbol: '🥳', label: 'Epic'       },
    { value: 10, symbol:'🤩', label: 'Mind-blown'}
  ];

  // Таблица
  displayedColumns = ['date','duration','mood'];
  dataSource       = new MatTableDataSource<SleepSession>([]);

  // Данные и опции для Chart.js
  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sleep Hours',
        fill: false,
        borderColor: '#8e24aa',
        tension: 0.4
      },
      {
        data: [],
        label: 'Ideal (8h)',
        fill: false,
        borderColor: 'green',
        borderDash: [5, 5]
      }
    ]
  };
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 12,
        ticks: { stepSize: 1 }
      }
    }
  };

  constructor(private fb: FormBuilder) {
    // Инициализация формы с текущей датой и дефолтным mood
    this.sleepForm = this.fb.group({
      date:      [ this.today(),          [] ],
      startTime: ['',                    []],
      endTime:   ['',                    []],
      mood:      [ this.selectedMood,    []]
    });
  }

  ngOnInit() {
    // Подписываемся, чтобы синхронизировать selectedMood с формой
    this.sleepForm.get('mood')!.valueChanges
      .subscribe((v: number) => this.selectedMood = v);
  }

  onSubmit() {
    if (this.sleepForm.invalid) return;

    // Извлекаем значения из формы
    const { date, startTime, endTime, mood } = this.sleepForm.value;

    // Вычисляем длительность в часах и ms
    const hours    = this.computeHours(startTime, endTime);
    const duration = `${Math.floor(hours)}h ${Math.round((hours % 1)*60)}m`;
    const emoji    = this.emojis.find(e => e.value === mood)!.symbol;

    // 1) Собираем новый рекорд
    const newRec: SleepSession = { date, duration, mood, emoji, hours };

    // 2) Обновляем массив и сортируем по дате
    const updated = [...this.dataSource.data, newRec];
    updated.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // 3) Заполняем таблицу
    this.dataSource.data = updated;

    // 4) Перестраиваем график на базе обновлённого упорядоченного массива
    this.chartData.labels    = updated.map(r => r.date);
    this.chartData.datasets[0].data = updated.map(r => r.hours);
    this.chartData.datasets[1].data = updated.map(() => 8);

    // 5) Ререндим график
    this.chart?.update();

    // 6) Сброс времени (дату и mood оставляем) и закрываем форму
    this.sleepForm.patchValue({ startTime: '', endTime: '' });
    this.showForm = false;
  }

  /** Преобразует времена в дробное число часов, учитывая переход через полночь */
  private computeHours(a: string, b: string): number {
    const [ah, am] = a.split(':').map(Number);
    const [bh, bm] = b.split(':').map(Number);
    let start = ah + am/60;
    let end   = bh + bm/60;
    if (end < start) end += 24;
    return +(end - start).toFixed(2);
  }

  /** Возвращает сегодняшнюю дату в формате YYYY-MM-DD для <input type="date"> */
  private today(): string {
    return new Date().toISOString().slice(0,10);
  }
}
