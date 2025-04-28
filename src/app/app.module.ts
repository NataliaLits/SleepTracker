import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';
import { SleepLogListComponent }    from './pages/sleep-log-list/sleep-log-list.component';
import { SleepLogFormComponent }    from './pages/sleep-log-form/sleep-log-form.component';
import { SleepLogDetailComponent }  from './pages/sleep-log-detail/sleep-log-detail.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
