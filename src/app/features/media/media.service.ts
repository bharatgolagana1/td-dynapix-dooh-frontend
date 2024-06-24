import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiUrl = 'http://localhost:3001/media';
  private tenantId = '123456';

  constructor(private http: HttpClient) {}

  uploadMedia(file: File, type: 'video' | 'image'): Observable<number> {
    const formData = new FormData();
    if (type === 'video') {
      formData.append('videoFiles', file);
    } else if (type === 'image') {
      formData.append('imageFiles', file);
    }

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

  getMedia(mediaType: string): Observable<any[]> {
    let url = `${this.apiUrl}?tenantId=${this.tenantId}`;
    if (mediaType !== 'both') {
      url += `&type=${mediaType}`;
    }
    return this.http.get<any[]>(url);
  }

  deleteMedia(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
