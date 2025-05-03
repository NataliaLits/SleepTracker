import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Forms & HTTP
import { FormsModule }             from '@angular/forms';
import { HttpClientModule }        from '@angular/common/http';

// Angular Material
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatButtonModule }         from '@angular/material/button';
import { MatCardModule }           from '@angular/material/card';
import { MatTableModule }          from '@angular/material/table';

// Charts
import { NgChartsModule }          from 'ng2-charts';

// Root
import { AppComponent }            from './app.component';

// Feature components
import { HeroComponent }           from './hero/hero.component';
import { SleepFormComponent }      from './sleep-form/sleep-form.component';
import { SleepChartComponent }     from './sleep-chart/sleep-chart.component';
import { HistoryTableComponent }   from './history-table/history-table.component';

// Service
import { SleepService }            from './sleep.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    SleepFormComponent,
    SleepChartComponent,
    HistoryTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Forms & HTTP
    FormsModule,
    HttpClientModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,

    // Charts
    NgChartsModule
  ],
  providers: [SleepService],
  bootstrap: [AppComponent]
})
export class AppModule {}
