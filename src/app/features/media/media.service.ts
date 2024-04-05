import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}

  async uploadMedia(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.http
        .post<any>(
          'http://ec2-13-211-129-217.ap-southeast-2.compute.amazonaws.com:3001/media',
          formData,
          {
            reportProgress: true,
            observe: 'events',
          }
        )
        .toPromise();

      if (response && response.type === HttpEventType.UploadProgress) {
        // Check if response.total is defined
        if (response.total !== undefined && response.total > 0) {
          // Upload progress event
          return Math.round((100 * response.loaded) / response.total);
        } else {
          // Unable to calculate progress percentage
          return -1;
        }
      } else if (response && response.type === HttpEventType.Response) {
        // Upload completed successfully
        return 100;
      } else {
        // Error occurred
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
