import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiUrl = 'http://localhost:3001/media';  

  constructor(private http: HttpClient) {}

  uploadMedia(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('videoFiles', file);

    return this.http.post(this.apiUrl, formData, {
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


