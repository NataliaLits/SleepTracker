import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';
import { SleepLogListComponent }    from './pages/sleep-log-list/sleep-log-list.component';
import { SleepLogFormComponent }    from './pages/sleep-log-form/sleep-log-form.component';
import { SleepLogDetailComponent }  from './pages/sleep-log-detail/sleep-log-detail.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatInputModule }         from '@angular/material/input';
import { MatButtonModule }        from '@angular/material/button';
import { MatCardModule }          from '@angular/material/card';
import { MatTableModule }         from '@angular/material/table';
import { MatSliderModule }        from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    SleepLogListComponent,
    SleepLogFormComponent,
    SleepLogDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSliderModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
