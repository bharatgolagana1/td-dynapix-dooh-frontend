import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicCasesService {
    private baseApiUrl =  environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  createPublicCase(publicCase: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/publicCase`, publicCase);
  }

  getPublicCases(
    pageIndex: number = 0,
    pageSize: number = 10,
    search: string = '',
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any>(`${this.baseApiUrl}/publicCase/cases`, { params });
  }

  getPublicCaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/publicCase/cases/${id}`);
  }

  getCaseTypes(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/caseTypes/getActiveCaseTypes`);
  }

  getCaseStatus(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/settings/caseStatus/getActiveCaseStatus`);
  }

  deletePublicCase(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/publicCase/cases/${id}`);
  }

  getScreenNameDetails(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/publicCase/screenName`, {
      params: { screenName },
    });
  }

  updatePublicCase(id: string, publicCase: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/publicCase/cases/${id}`, publicCase);
  }
}
