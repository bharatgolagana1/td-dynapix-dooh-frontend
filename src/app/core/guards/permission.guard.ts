import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from 'src/app/features/roles-matrix/services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredPermission = route.data['permission'];

    if (this.permissionsService.hasPermission(requiredPermission)) {
      return true;
    } else {
      return this.permissionsService.getAllPermissions().toPromise().then((permissions) => {
        this.permissionsService.setPermissions(permissions!);
        if (this.permissionsService.hasPermission(requiredPermission)) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
    }
  }
}