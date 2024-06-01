
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private localApiUrl = 'http://localhost:3001/media';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.localApiUrl}/categories`);
  }

  getCompanyNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.localApiUrl}/companyNames`);
  }

  uploadMedia(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('videoFiles', file);

    return this.http.post('http://localhost:3001/media', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text',
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return Math.round((100 * event.loaded) / (event.total || 1));
          case HttpEventType.Response:
            return 100;
          default:
            return 0;
        }
      })
    );
  }
}

