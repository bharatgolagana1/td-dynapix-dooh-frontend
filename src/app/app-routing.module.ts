import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AppRoutePaths } from './core/constants';

const routes: Routes = [
  { path: '', redirectTo: AppRoutePaths.dashboard, pathMatch: 'full' },

  {
    path: AppRoutePaths.dashboard,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.users,
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.schedulers,
    loadChildren: () =>
      import('./features/schedulers/scheduler.module').then(
        (m) => m.SchedulerModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.media,
    loadChildren: () =>
      import('./features/media/media.module').then((m) => m.MediaModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.screen,
    loadChildren: () =>
      import('./features/screen/screen.module').then((m) => m.ScreenModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.updateScreen,
    loadChildren: () =>
      import('./features/schedulers/scheduler.module').then(
        (m) => m.SchedulerModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutePaths.roles,
    loadChildren: () =>
      import('./features/roles-matrix/roles.module').then((m) => m.RolesModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
