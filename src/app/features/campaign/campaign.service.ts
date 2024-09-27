import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private baseApiUrl = environment.baseApiUrl;


  constructor(
    private http: HttpClient,
    private keycloakOperationService: KeycloakOperationService
  ) {}

  private appendOrganizationId(params: HttpParams): HttpParams {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params = params.set('organizationId', organizationId);
    }
    return params;
  }

  searchScreensByName(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/campaign/search`, {
      params: { screenName },
    });
  }

  getScreenDetailsByName(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/campaign/screen/details?screenName=${screenName}`
    );
  }

  getPlaylistByScreenIdAndDate(
    screenId: string,
    date: string,
    organizationId: any
  ): Observable<any> {
    const params = new HttpParams()
      .set('screenId', screenId)
      .set('date', date)
      .set('organizationId', organizationId);

    const url = `${this.baseApiUrl}/playlist`;

    return this.http.get<any>(url, { params });
  }

  getCustomerNames(): Observable<any> {
    let params = new HttpParams();
    params = this.appendOrganizationId(params);
    return this.http.get(`${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`, { params });
  }

  getExtraSlotSize(): Observable<any[]> {
    let params = new HttpParams();
    params = this.appendOrganizationId(params);
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/getActiveExtraSlotSize`,
      { params }
    );
  }

  getCategoryOptions(): Observable<any[]> {
    let params = new HttpParams();
    params = this.appendOrganizationId(params);
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/getActiveCategoryOptions`,
      { params }
    );
  }

  getCampaigns(
    pageIndex: number = 0,
    pageSize: number = 10,
    search: string = '',
    sortBy: string = 'createdDate',
    sortOrder: string = 'desc'
  ): Observable<any> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    params = this.appendOrganizationId(params);

    return this.http.get<any>(`${this.baseApiUrl}/campaign`, { params });
  }

  getDateOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/date`);
  }

  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/screenType`
    );
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }

  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/slotSize`);
  }

  getCampaignById(campaignId: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/campaign/${campaignId}`);
  }

  getScreensByIds(screenIds: string[]): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/screen/get-by-ids`, {
      screenIds,
    });
  }

  createCampaign(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/campaign/create`, formData);
  }

  uploadMedia(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/uploadMedia`, formData);
  }

  campaignUploadMedia(campaignId: string, formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseApiUrl}/campaign/${campaignId}/media/upload`,
      formData
    );
  }

  screensList(filters: any): Observable<any> {
    return this.http.post(
      `${this.baseApiUrl}/screen/api/available-screens`,
      filters
    );
  }

  updateLiveApproval(campaignId: string): Observable<any> {
    const body = { campaignId };
    return this.http.post(`${this.baseApiUrl}/campaign/campaign/live-approval`, body);
  }
  
}
