// src/app/sleep.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SleepSession {
  id?:        number;
  date:       string;
  startTime:  string;
  endTime:    string;
  mood:       number;

  // Добавляем эти поля, чтобы совпадало с тем, что вы строите в AppComponent:
  duration?:  string;  // например "7h 15m"
  emoji?:     string;  // символ эмоджи
  hours?:     number;  // дробное число часов
}

@Injectable({ providedIn: 'root' })
export class SleepService {
  private apiUrl = 'https://your-backend.api/sleep';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SleepSession[]> {
    return this.http.get<SleepSession[]>(this.apiUrl);
  }

  add(session: SleepSession): Observable<SleepSession> {
    return this.http.post<SleepSession>(this.apiUrl, session);
  }

  update(id: number, session: SleepSession): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, session);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
