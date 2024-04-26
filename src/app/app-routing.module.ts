import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePaths } from './core/constants';
import { DashboardMainComponent } from './features/dashboard/components/dashboard-main/dashboard-main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutePaths.empty,
  },
  {
    path: AppRoutePaths.dashboard,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: AppRoutePaths.users,
    loadChildren: () =>
      import('./features/users/users.module').then(
        (m) => m.UsersModule
      ),},

  {
    path: AppRoutePaths.schedulers,
    loadChildren: () =>
      import('./features/schedulers/scheduler.module').then(
        (m) => m.SchedulerModule
      ),
  },
  {
    path: AppRoutePaths.media,
    loadChildren: () =>
      import('./features/media/media.module').then(
        (m) => m.MediaModule
      ),
  },
  {
    path: AppRoutePaths.screen,
    loadChildren: () =>
      import('./features/screen/screen.module').then(
        (m) => m.ScreenModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
