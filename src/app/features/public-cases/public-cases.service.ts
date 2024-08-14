import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicCasesService {
    private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  createPublicCase(publicCase: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/publicCase`, publicCase);
  }

  getPublicCases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}`);
  }

  getCaseTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}/publicCase/casetypes`);
  }

  getCaseStatus(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}/publicCase/casestatus`);
  }

  deletePublicCase(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/${id}`);
  }
}
