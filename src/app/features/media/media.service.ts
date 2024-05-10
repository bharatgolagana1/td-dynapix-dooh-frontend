import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}

  async uploadMedia(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('videoFiles', file);

    try {
      const response = await this.http.post('http://localhost:3001/media', formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text',
      }).toPromise();

      if (response && response.type === HttpEventType.UploadProgress) {
        const progressEvent = response as HttpEvent<ProgressEvent>;
        const progress = this.calculateUploadProgress(progressEvent);

        return progress;
      } else if (response instanceof HttpResponse) {
        console.log('Upload response:', response);
        const responseBody = response.body;
        if (responseBody && responseBody.includes('Media uploaded successfully')) {
          return 100;
        } else {
          throw new Error('Unexpected response from server');
        }
      } else {
        throw new Error('Unexpected event during upload');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  private calculateUploadProgress(event: HttpEvent<ProgressEvent>): number {
    if (!event || event.type !== HttpEventType.UploadProgress) {
      return 0;
    }
    const progressEvent = event as HttpEvent<ProgressEvent>;
    const loaded = event?.loaded || 0;
    const total = event?.total || 0;

    const progress = Math.round((100 * loaded) / (total || 1));

    return progress;
  }
}
