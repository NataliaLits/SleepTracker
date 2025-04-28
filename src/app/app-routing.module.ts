import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SleepLogListComponent } from './pages/sleep-log-list/sleep-log-list.component';
import { SleepLogFormComponent } from './pages/sleep-log-form/sleep-log-form.component';
import { SleepLogDetailComponent } from './pages/sleep-log-detail/sleep-log-detail.component';

export const routes: Routes = [
  { path: 'logs',       component: SleepLogListComponent },
  { path: 'logs/new',   component: SleepLogFormComponent },
  { path: 'logs/:id',   component: SleepLogDetailComponent },
  { path: '',           redirectTo: 'logs', pathMatch: 'full' },
  { path: '**',         redirectTo: 'logs' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
