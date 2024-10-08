import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient, private keycloakOperationService: KeycloakOperationService) {}
  private ApiUrl = `${environment.baseApiUrl}/api/terms-and-conditions`;

  private appendOrganizationId(params: any = {}) {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params['organizationId'] = organizationId;
    }
    return params;
  }

  createIdentificationType(status: boolean, identificationType: string): Observable<any> {
    const params = this.appendOrganizationId({ status, identificationType });
    return this.http.post(`${this.apiUrl}/settings/user/createIdentificationtype`, params);
  }


  deleteIdentificationType(identificationType: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/settings/user/deleteIdentificationtype`,
      { body: { identificationType } }
    );
  }

  getIdentificationTypes(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getIdentificationTypes`, { params });
  }

  getActiveIdentificationTypes(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(
      `${this.apiUrl}/settings/user/getActiveIdentificationtypes`, { params }
    );
  }

  updateIdentificationTypeStatus(identificationType: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/user/updateIdentificationType/${identificationType}`, body);
  }

  createRole(status: boolean, role: string): Observable<any> {
    const params = this.appendOrganizationId({ status, role });
    return this.http.post(`${this.apiUrl}/settings/user/createRole`, params);
  }

  deleteRole(role: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/user/deleteRole`, { body: { role } });
  }

  getRoles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getRoles`, { params });
  }

  getActiveRoles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getActiveRoles`, { params });
  }

  updateRoleStatus(role: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/user/updateRole/${role}`, body);
  }


  createProfile(status: boolean, profile: string): Observable<any> {
    const params = this.appendOrganizationId({ status, profile });
    return this.http.post(`${this.apiUrl}/settings/user/createProfile`, params);
  }

  deleteProfile(profile: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/user/deleteProfile`, { body: { profile } });
  }

  getProfiles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getProfiles`, { params });
  }

  getActiveProfiles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getActiveProfiles`, { params });
  }
  updateProfileStatus(profile: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/user/updateProfile/${profile}`, body);
  }

  getSchedulers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/settings/schedulers/getScheduler`);
  }

  createScheduler(scheduler: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/settings/schedulers/createScheduler`,
      scheduler
    );
  }


  updateScheduler( id:string , status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/schedulers/updateScheduler/${id}`, { status });
  }

  deleteScheduler(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/settings/schedulers/deleteScheduler`, {
      body: { id },
    });
  }

  createCustomerName(name: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ name, status });
    return this.http.post(`${this.apiUrl}/settings/campaign/createCustomerNames`, params);
  }
  deleteCustomerName(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteCustomerNames`, { body: { name } });
  }

  getCustomerNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/campaign/getCustomerNames`, { params });
  }

  updateCustomerNameStatus(name: string, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/campaign/customerNames/${name}`, { status });
  }


  createCategoryOption(status: boolean, categoryOption: string): Observable<any> {
    const params = this.appendOrganizationId({ status, categoryOption });
    return this.http.post(`${this.apiUrl}/settings/campaign/createCategoryOption`, params);
  }

  deleteCategoryOption(categoryOption: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteCategoryOption`, { body: { categoryOption } });
  }

  getCategoryOptions(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/campaign/categoryOptions`, { params });
  }

  updateCategoryOption(categoryOption: string, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/campaign/updateCategoryOption/${categoryOption}`, { status });
  }

  createExtraSlotSize(slotSize: number, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ slotSize, status });
    return this.http.post(`${this.apiUrl}/settings/campaign/extraSlotSize`, params);
  }

  getExtraSlotSizes(): Observable<any[]> {
    const params = this.appendOrganizationId();
    return this.http.get<any[]>(`${this.apiUrl}/settings/campaign/getExtraSlotSize`, { params });
  }

  updateExtraSlotSizeStatus(slotSize: number, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/campaign/updateExtraSlotSize/${slotSize}`, { status });
  }

  deleteExtraSlotSize(slotSize: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteExtraSlotSize`, { body: { slotSize } });
  }

  createCityName(cityName: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ cityName, status });
    return this.http.post(`${this.apiUrl}/settings/screen/createCityNames`, params);
  }

  getCityNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/screen/getCityNames`, { params });
  }


  updateCityNameStatus(cityName: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/screen/cityNames/${cityName}`, body);
  }

  deleteCityName(cityName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/screen/deleteCityNames`, { body: { cityName } });
  }

  createScreenCategory(categoryName: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ categoryName, status });
    return this.http.post(`${this.apiUrl}/settings/screen/createScreenCategories`, params);
  }

  deleteScreenCategory(categoryName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/screen/deleteScreenCategories`, { body: { categoryName } });
  }

  getScreenCategories(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/screen/getScreenCategories`, { params });
  }

  updateScreenCategoryStatus(categoryName: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/screen/screenCategories/${categoryName}`, body);
  }

  createScreenNetwork(networkName: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ networkName, status });
    return this.http.post(`${this.apiUrl}/settings/screen/createScreenNetworks`, params);
  }

  deleteScreenNetwork(networkName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/screen/deleteScreenNetworks`, { body: { networkName } });
  }

  getScreenNetworks(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/screen/getScreenNetworks`, { params });
  }


  updateScreenNetworkStatus(networkName: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/screen/screenNetworks/${networkName}`, body);
  }

  createState(stateName: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ stateName, status });
    return this.http.post(`${this.apiUrl}/settings/state/createStates`, params);
  }

  deleteState(stateName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/state/deleteStates`, { body: { stateName } });
  }

  getStates(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/state/getStates`, { params });
  }

  updateStateStatus(stateName: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/state/updateStates/${stateName}`, body);
  }

  
   
   getTermsAndConditions(): Observable<any> {
    return this.http.get(`${this.ApiUrl}`);
  }

  createTermsAndConditions(content: string, status: boolean=true): Observable<any> {
    const body = { content, status };
    return this.http.post(`${this.ApiUrl}`, body);
  }

  updateTermsAndConditions(id: string, content: string, status: boolean): Observable<any> {
    const body = { content, status };
    return this.http.put(`${this.ApiUrl}/${id}`, body);
  }

  deleteTermsAndConditions(id: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/${id}`);
  }

  createMediaIdentity(mediaName: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ mediaName, status });
    return this.http.post(`${this.apiUrl}/settings//quote/createMediaIdentity`, params);
  }
  
  getMediaIdentities(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/quote/getMediaIdentity`, { params });
  }

  getActiveMediaIdentity(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/quote/getActiveMediaIdentity`, { params });
  }
  
  
  updateMediaIdentityStatus(mediaName: string, status: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings/quote/mediaIdentity/${mediaName}`, { status });
  }
  
  deleteMediaIdentity(mediaName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/quote/deleteMediaIdentity`,{body: {mediaName}});
  }

  createCaseType(status: boolean, caseType: string): Observable<any> {
    const params = this.appendOrganizationId({ status, caseType });
    return this.http.post(`${this.apiUrl}/settings/caseTypes/createCaseType`, params);
  }

  deleteCaseType(caseType: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/caseTypes/deleteCaseType`, { body: { caseType } });
  }

  getCaseTypes(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/caseTypes/getCaseTypes`, { params });
  }


  updateCaseTypeStatus(caseType: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/caseTypes/${caseType}`, body);
  }


  createCaseStatus(status: boolean, caseStatus: string): Observable<any> {
    const params = this.appendOrganizationId({ status, caseStatus });
    return this.http.post(`${this.apiUrl}/settings/caseStatus/createCaseStatus`, params);
  }

  deleteCaseStatus(caseStatus: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/settings/caseStatus/delete`, { body: { caseStatus } });
  }

  getCaseStatuses(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/caseStatus/getCaseStatus`, { params });
  }

  updateCaseStatusStatus(caseStatus: string, status: boolean): Observable<any> {
    const body = { status };
    return this.http.put(`${this.apiUrl}/settings/caseStatus/update/${caseStatus}`, body);
  }

  
}
