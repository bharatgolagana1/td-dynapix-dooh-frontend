import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private apiUrl = 'http://localhost:3001/screen'; 
  constructor(private http: HttpClient) { }
  createScreen(screenData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, screenData);
  }
  
}