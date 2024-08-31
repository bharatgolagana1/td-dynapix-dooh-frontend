import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generate } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenerateService {
  private baseApiUrl = 'http://localhost:3000';
  private apiUrl = '/generate/image';

  constructor(private http: HttpClient) {}

  generateImage(
    prompt: string,
    size: string = '1024x1024',
    numberOfImages: number = 1
  ): Observable<{ imageUrl: string[] }> {
    const payload = { prompt, size, numberOfImages };
    return this.http.post<{ imageUrl: string[] }>(
      `${this.baseApiUrl}/generate/image`,
      payload
    );
  }
}
