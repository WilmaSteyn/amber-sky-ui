import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PhotoDetails} from '../../domain/photo-details';
import {Subscription} from 'rxjs';
import {AppConstants} from '../../config/app-constants';
import {PhotoDataService} from '../../services/photo-data.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-special-gallery',
  templateUrl: './special-gallery.component.html',
  styleUrls: ['./special-gallery.component.css']
})
export class SpecialGalleryComponent implements OnInit, OnDestroy {

  public photos: PhotoDetails[];
  public photoCount: number;
  public busy: boolean;

  private pkSpecialGallery: number;

  private photoSubscription: Subscription;
  private photoCountSubscription: Subscription;

  constructor(private appConstants: AppConstants,
              private photoDataService: PhotoDataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.busy = true;
    this.photoSubscription = this.photoDataService.getPhotos().subscribe((data: PhotoDetails[]) => {
      this.photos = data;
      this.busy = false;
    }, (error => {
      this.busy = false;
    }));
    this.photoCountSubscription = this.photoDataService.getPhotoCount().subscribe((data: number) => {
      this.photoCount = data;
    });
    this.route.params.subscribe(params => {
      this.pkSpecialGallery = params['id'];
      this.photoDataService.retrieveSpecialGalleryPhotos(this.pkSpecialGallery);
    });
  }

  ngOnDestroy(): void {
    this.photoSubscription.unsubscribe();
    this.photoCountSubscription.unsubscribe();
  }

}
