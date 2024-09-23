import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from 'src/app/features/roles-matrix/services/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private permissionsService: PermissionsService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredPermission = next.data['permission'];
    
    if (this.permissionsService.hasPermission(requiredPermission)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
