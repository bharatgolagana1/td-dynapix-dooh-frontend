import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './features/side-nav/side-nav.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { BookInventoryComponent } from './features/book-inventory/book-inventory.component';
import { MediaUploadComponent } from './features/media-upload/media-upload.component';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { NewInventoryComponent } from './features/new-inventory/new-inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UsersModule } from './features/users/users.module';
import { MediaModule } from './features/media/media.module';
import { ScreenModule } from './features/screen/screen.module';
import { SchedulerModule } from './features/schedulers/scheduler.module';
import { BookingModule } from './features/booking/booking.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { RolesModule } from './features/roles-matrix/roles.module';
import { PublicScreensComponent } from './features/public/public-screens/public-screens.component';
import { ScreenMapComponent } from './features/public/screen-map/screen-map.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: 'dynapix-dooh',
        clientId: 'angular-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    UserProfileComponent,
    BookInventoryComponent,
    MediaUploadComponent,
    CreateUserComponent,
    NewInventoryComponent,
    PublicScreensComponent,
    ScreenMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    DashboardModule,
    UsersModule,
    MediaModule,
    SchedulerModule,
    ScreenModule,
    BookingModule,
    KeycloakAngularModule,
    RolesModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
