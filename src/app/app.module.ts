import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './features/side-nav/side-nav.component';
import { DashboardComponent } from './features/side-nav/dashboard/dashboard.component';
import { UserProfileComponent } from './features/side-nav/user-profile/user-profile.component';
import { BookInventoryComponent } from './features/side-nav/book-inventory/book-inventory.component';
import { MediaUploadComponent } from './features/side-nav/media-upload/media-upload.component';
import { CreateUserComponent } from './features/side-nav/create-user/create-user.component';
import { NewInventoryComponent } from './features/side-nav/new-inventory/new-inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    DashboardComponent,
    UserProfileComponent,
    BookInventoryComponent,
    MediaUploadComponent,
    CreateUserComponent,
    NewInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


