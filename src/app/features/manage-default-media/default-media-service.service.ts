import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DefaultMediaService {
  // private baseUrl = 'http://localhost:3000';
  private baseUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  uploadDefaultMedia(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/default-media/upload`,
      formData
    );
  }

  getDefaultMedia(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/default-media`);
  }
}
