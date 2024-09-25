import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AppRoutePaths } from './core/constants';
import { PublicScreensComponent } from './features/public/public-screens/public-screens.component';
import { ServerNotfoundComponent } from './features/server-notfound/server-notfound.component';
import { PermissionGuard } from './core/guards/permission.guard';

const routes: Routes = [
  { path: '', redirectTo: AppRoutePaths.dashboard, pathMatch: 'full' },

  {
    path: AppRoutePaths.dashboard,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'view_dashboard' },
  },
  {
    path: AppRoutePaths.users,
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'View_Users' },
  },
  {
    path: AppRoutePaths.schedulers,
    loadChildren: () =>
      import('./features/schedulers/scheduler.module').then(
        (m) => m.SchedulerModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
       data: { permission: 'View_Schedulers' },
  },
  {
    path: AppRoutePaths.media,
    loadChildren: () =>
      import('./features/media/media.module').then((m) => m.MediaModule),
    canActivate: [AuthGuard, PermissionGuard],
       data: { permission: 'View_Media' },
  },
  {
    path: AppRoutePaths.defaultMedia,
    loadChildren: () =>
      import(
        './features/manage-default-media/manage-default-media.module'
      ).then((m) => m.ManageDefaultMediaModule),
  },
  {
    path: AppRoutePaths.screen,
    loadChildren: () =>
      import('./features/screen/screen.module').then((m) => m.ScreenModule),
      canActivate: [AuthGuard, PermissionGuard],
       data: { permission: 'View_Screens' },
    
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
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'View_Roles' },
  },
  {
    path: AppRoutePaths.organization,
    loadChildren: () =>
      import('./features/organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'View_Organization' },
  },
  {
    path: AppRoutePaths.booking,
    loadChildren: () =>
      import('./features/booking/booking.module').then((m) => m.BookingModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'View_Booking' },
  },
  {
    path: AppRoutePaths.campaign,
    loadChildren: () =>
      import('./features/campaign/campaign.module').then(
        (m) => m.CampaignModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'View_Campaign' },
  },
  {
    path: AppRoutePaths.quote,
    loadChildren: () =>
      import('./features/quote/quote.module').then((m) => m.QuoteModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'View_Quote' },
  },
  {
    path: 'public-screens',
    component: PublicScreensComponent,
  },
  {
    path: AppRoutePaths.settings,
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'View_Settings' },
  },
  {
    path: AppRoutePaths.generate,
    loadChildren: () =>
      import('./features/ai-generator/ai-generator-routing.module').then(
        (m) => m.AIGeneratorRoutingModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'View_Generate' },
  },
  {
    path: AppRoutePaths.payment,
    loadChildren: () =>
      import('./features/payment/payment.module').then(
        (m) => m.PaymentModule
      ),
      canActivate: [AuthGuard, PermissionGuard],
      data: { permission: 'View_Payment' },
  },
  {
    path: 'page-not-found',
    component: ServerNotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
