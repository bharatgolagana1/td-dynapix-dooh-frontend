import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap, of } from 'rxjs';
import { KeycloakOperationService } from '../services/keycloak.service';
import { UserService } from '../services/user.service';

@Injectable()
export class OrgIdInterceptor implements HttpInterceptor {
  constructor(
    private keycloakService: KeycloakOperationService,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedEndpoints = ['/me', '/token', '/account'];

    const isExcluded = excludedEndpoints.some((endpoint) =>
      req.url.includes(endpoint)
    );

    if (isExcluded) {
      return next.handle(req);
    }

    return this.userService.getOrgData().pipe(
      switchMap((data) => {
        if (!data.organizationId) {
          return this.keycloakService.getUserData().pipe(
            switchMap((userData) => {
              data.organizationId = userData.organizationId;
              data.userId = userData.userId;
              data.userEmail = userData.userEmail;
              return this.cloneAndHandleRequest(req, next, data);
            })
          );
        } else {
          return this.cloneAndHandleRequest(req, next, data);
        }
      })
    );
  }

  private cloneAndHandleRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    data: any
  ): Observable<HttpEvent<any>> {
    let clonedRequest = req;

    if (req.method === 'POST' && data) {
      if (req.body instanceof FormData) {
        req.body.append('OrganizationId', data.organizationId as string);
        req.body.append('userId', data.userId as string);
        req.body.append('userEmail', data.userEmail as string);
        clonedRequest = req.clone({
          body: req.body,
        });
      } else {
        const body = {
          ...req.body,
          OrganizationId: data.organizationId,
          userId: data.userId,
          userEmail: data.userEmail,
        };
        clonedRequest = req.clone({
          body,
        });
      }
    } else if ((req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT') && data.organizationId) {
      clonedRequest = req.clone({
        headers: req.headers
          .set('OrganizationId', data.organizationId)
          .set('userId', data.userId || '')
          .set('userEmail', data.userEmail || ''),
      });
    }

    return next.handle(clonedRequest);
  }
}
