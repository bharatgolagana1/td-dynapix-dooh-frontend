import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  // private baseUrl = `${environment.baseApiUrl}/settings/campaign`;
  private baseApiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Get a list of campaigns
   */
  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseApiUrl}/campaigns`);
  }

  /**
   * Get options for date filters
   */
  getDateOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/date`);
  }

  /**
   * Get options for screen types
   */
  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/screenType`);
  }

  /**
   * Get options for campaign status
   */
  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }

  /**
   * Get options for campaign categories
   */
  getCategoryOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/category`);
  }

  /**
   * Get options for slot sizes
   */
  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/slotSize`);
  }

  /**
   * Create a new campaign
   * @param formData The form data containing the campaign details
   */
  createCampaign(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/campaign`, formData);
  }

  /**
   * Upload media files for a specific campaign
   * @param formData The form data containing the campaign ID and media files
   */
  uploadMedia(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/uploadMedia`, formData);
  }

  /**
   * Get the list of available screens based on filters
   * @param filters The filters applied to the screen list
   */
  screensList(filters: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/screen/api/available-screens`, filters);
  }
}
