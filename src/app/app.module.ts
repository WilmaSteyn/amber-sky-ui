import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThumbnailMasonryComponent } from './components/thumbnail-masonry/thumbnail-masonry.component';
import {AppConstants} from './config/app-constants';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxMasonryModule} from 'ngx-masonry';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainGalleryComponent } from './components/main-gallery/main-gallery.component';
import {LightboxComponent} from './components/lightbox/lightbox.component';
import {LightboxOverlayComponent} from './components/lightbox/lightbox-overlay.component';
import {Lightbox} from './components/lightbox/services/lightbox.service';
import {LightboxConfig} from './components/lightbox/services/lightbox-config.service';
import {LightboxEvent, LightboxWindowRef} from './components/lightbox/services/lightbox-event.service';
import { FullscreenComponent } from './components/fullscreen/fullscreen.component';
import { TripComponent } from './components/trip/trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import {HttpAddHeadersInterceptor} from './interceptors/http-add-headers-interceptor.service';
import {NgMasonryGridModule} from './components/masonry';
import { SpecialGalleryComponent } from './components/special-gallery/special-gallery.component';
import { SpeciesListComponent } from './components/species-list/species-list.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { CopyrightNoticeComponent } from './components/copyright-notice/copyright-notice.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { ClassificationDescriptionComponent } from './components/classification-description/classification-description.component';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailMasonryComponent,
    MainGalleryComponent,
    LightboxOverlayComponent,
    LightboxComponent,
    FullscreenComponent,
    TripComponent,
    TripListComponent,
    SpecialGalleryComponent,
    SpeciesListComponent,
    AboutUsComponent,
    NavHeaderComponent,
    CopyrightNoticeComponent,
    FooterComponent,
    ClassificationDescriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMasonryModule,
    NgMasonryGridModule,
    MatDialogModule
  ],
  providers: [
    AppConstants,
    Lightbox,
    LightboxConfig,
    LightboxEvent,
    LightboxWindowRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAddHeadersInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  entryComponents: [ LightboxOverlayComponent, LightboxComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
