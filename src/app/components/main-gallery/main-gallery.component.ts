import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../domain/category';
import {CategoryDataService} from '../../services/category-data.service';
import {PhotoDetails} from '../../domain/photo-details';
import {PhotoDataService} from '../../services/photo-data.service';
import {AppConstants} from '../../config/app-constants';
import {Subscription} from 'rxjs';
import {ThumbnailMasonryComponent} from "../thumbnail-masonry/thumbnail-masonry.component";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.css']
})
export class MainGalleryComponent implements OnInit, OnDestroy {

  @ViewChild('thumbnailMasonry') thumbnailMasonry: ThumbnailMasonryComponent;

  public categories: Category[];
  public photos: PhotoDetails[];
  public photoCount: number;
  public lastOffset = 0;
  public busy: boolean;
  public selectedCategory = -1;

  private categorySubscription: Subscription;
  private photoSubscription: Subscription;
  private photoCountSubscription: Subscription;

  constructor(private appConstants: AppConstants,
              private categoryDataService: CategoryDataService,
              private photoDataService: PhotoDataService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.navigateTo('portfolio');
    this.busy = true;
    this.photos = [];
    this.categorySubscription = this.categoryDataService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
    this.photoSubscription = this.photoDataService.getPhotos().subscribe((data: PhotoDetails[]) => {
      for (const photo of data) {
        this.photos.push(photo);
      }
      this.busy = false;
    }, (error => {
      this.busy = false;
    }));
    this.photoCountSubscription = this.photoDataService.getPhotoCount().subscribe((data: number) => {
      this.photoCount = data;
    });
    this.photoDataService.countPhotos(this.selectedCategory);
    this.photoDataService.retrievePhotos(-1, 0);
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.photoSubscription.unsubscribe();
    this.photoCountSubscription.unsubscribe();
  }

  public loadMore() {
    this.busy = true;
    this.lastOffset = this.lastOffset + this.appConstants.PHOTOS_PER_PAGE;
    this.photoDataService.retrievePhotos(this.selectedCategory, this.lastOffset);
  }

  public selectCategory(pkCategory: number) {
    this.busy = true;
    this.photos = [];
    this.thumbnailMasonry.resetPhotosLoaded();
    this.selectedCategory = pkCategory;
    this.lastOffset = 0;
    this.photoDataService.countPhotos(this.selectedCategory);
    this.photoDataService.retrievePhotos(this.selectedCategory, 0);
  }

  public getSelectedClass(pkCategory: number) {
    if (this.selectedCategory === pkCategory) {
      return 'selected';
    } else {
      return '';
    }
  }

}
