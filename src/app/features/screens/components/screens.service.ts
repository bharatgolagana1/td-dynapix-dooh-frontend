import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private apiUrl = 'http://localhost:3001/screen'; 
  private tenantId ='12345'
  constructor(private http: HttpClient) { }
  createScreen(screenData: any): Observable<any> {
    console.log('screen:',screenData)
    return this.http.post<any>(`${this.apiUrl}`, { ...screenData,tenantId:this.tenantId});
  }
}