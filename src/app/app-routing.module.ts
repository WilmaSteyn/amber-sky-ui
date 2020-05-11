import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGalleryComponent} from './components/main-gallery/main-gallery.component';
import {TripListComponent} from './components/trip-list/trip-list.component';
import {SpecialGalleryComponent} from './components/special-gallery/special-gallery.component';
import {SpeciesListComponent} from './components/species-list/species-list.component';
import {AboutUsComponent} from './components/about-us/about-us.component';


const routes: Routes = [
  { path: 'main-gallery', component: MainGalleryComponent},
  { path: 'trips', component: TripListComponent},
  { path: 'special-gallery/:id', component: SpecialGalleryComponent},
  { path: 'species', component: SpeciesListComponent},
  { path: 'about', component: AboutUsComponent},
  { path: '', redirectTo: 'main-gallery', pathMatch: 'full'},
  { path: '**', redirectTo: 'main-gallery', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
