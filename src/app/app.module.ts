import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    UserProfileComponent,
    BookInventoryComponent,
    MediaUploadComponent,
    CreateUserComponent,
    NewInventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
