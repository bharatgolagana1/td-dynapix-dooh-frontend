import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private baseApiurl = environment.baseApiUrl; 

  constructor(private http: HttpClient) { }
  listScreens(page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.baseApiurl}/screen/api/screens`, { params });
  }

  deleteScreen(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseApiurl}/screen/${id}`);
  }
  createScreen(screenData: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiurl}/screen`, screenData);
  }

  updateScreen(id: string, formData: FormData) {
    const url = `${this.baseApiurl}/screen/${id}`;
    return this.http.put(url, formData);
  }

  getScreenDetails(screenId: string): Observable<any> {
    const url = `${this.baseApiurl}/screen/${screenId}`;
    return this.http.get<any>(url);
  }
}
