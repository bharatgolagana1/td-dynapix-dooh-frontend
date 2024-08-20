import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class OrgIdInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

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
    // return next.handle(req);
    return this.userService.getOrgId().pipe(
      switchMap((orgId) => {
        let clonedRequest = req;

        if (req.method === 'POST' && orgId) {
          const body = { ...req.body, OrganizationId: orgId };
          clonedRequest = req.clone({
            body,
          });
        }
        else if (req.method === 'GET' && orgId) {
          clonedRequest = req.clone({
            headers: req.headers.set('OrganizationId', orgId),
          });
        }

        return next.handle(clonedRequest);
      })
    );
  }
}
