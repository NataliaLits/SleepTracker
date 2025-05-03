import { Component, EventEmitter, Output } from '@angular/core';
import { SleepService, SleepSession }      from '../sleep.service';

interface Emoji {
  value:  number;
  symbol: string;
  label:  string;
}

@Component({
  selector: 'app-sleep-form',
  templateUrl: './sleep-form.component.html',
  styleUrls: ['./sleep-form.component.scss']
})
export class SleepFormComponent {
  @Output() saved = new EventEmitter<void>();

  showForm = false;
  selectedMood = 5;

  session: {
    date: string;
    startTime: string;
    endTime: string;
    mood: number;
  } = {
    date:      this.today(),
    startTime: '',
    endTime:   '',
    mood:      this.selectedMood
  };

  emojis: Emoji[] = [
    { value: 1, symbol: '😞', label: 'Terrible' },
    { value: 2, symbol: '😕', label: 'Bad'      },
    { value: 3, symbol: '😐', label: 'Meh'      },
    { value: 4, symbol: '🙂', label: 'Okay'     },
    { value: 5, symbol: '😊', label: 'Good'     },
    { value: 6, symbol: '😃', label: 'Great'    },
    { value: 7, symbol: '😁', label: 'Awesome'  },
    { value: 8, symbol: '😆', label: 'Fantastic'},
    { value: 9, symbol: '🥳', label: 'Epic'     },
    { value:10, symbol:'🤩', label: 'Mind-blown'}
  ];

  constructor(private sleepService: SleepService) {}

  openForm(): void {
    this.showForm = true;
  }

  onSubmit(): void {
    const { date, startTime, endTime, mood } = this.session;
    if (!date || !startTime || !endTime) return;

    const hours   = this.computeHours(startTime, endTime);
    const duration= `${Math.floor(hours)}h ${Math.round((hours%1)*60)}m`;
    const emoji   = this.emojis.find(e=>e.value===mood)!.symbol;

    const rec: SleepSession = { date, startTime, endTime, mood, duration, emoji, hours };

    this.sleepService.add(rec).subscribe(() => {
      this.saved.emit();
      this.resetForm();
      this.showForm = false;
    });
  }

  private resetForm() {
    this.session = {
      date:      this.today(),
      startTime: '',
      endTime:   '',
      mood:      this.selectedMood
    };
  }

  private computeHours(a:string,b:string):number {
    const [ah,am]=a.split(':').map(Number);
    const [bh,bm]=b.split(':').map(Number);
    let start=ah+am/60, end=bh+bm/60;
    if(end<start) end+=24;
    return +(end-start).toFixed(2);
  }

  private today(): string {
    return new Date().toISOString().slice(0,10);
  }
}
