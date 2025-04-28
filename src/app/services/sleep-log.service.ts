// src/app/services/sleep-log.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SleepLog } from '../models/sleep-log.model';  // <-- верный путь

@Injectable({
  providedIn: 'root'
})
export class SleepLogService {
  private apiUrl = '/api/SleepLog';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SleepLog[]> {
    return this.http.get<SleepLog[]>(this.apiUrl);
  }

  getById(id: number): Observable<SleepLog> {
    return this.http.get<SleepLog>(`${this.apiUrl}/${id}`);
  }

  create(log: Omit<SleepLog, 'id'>): Observable<SleepLog> {
    return this.http.post<SleepLog>(this.apiUrl, log);
  }

  update(id: number, log: Omit<SleepLog, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, log);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
