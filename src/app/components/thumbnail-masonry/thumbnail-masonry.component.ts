import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild, ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {PhotoDetails} from '../../domain/photo-details';
import {PhotoDataService} from '../../services/photo-data.service';
import {AppConstants} from '../../config/app-constants';
import {NgxMasonryOptions} from 'ngx-masonry';
import {Lightbox} from '../lightbox/services/lightbox.service';
import {Masonry} from '../masonry';
import {FullscreenService} from "../fullscreen/services/fullscreen.service";

@Component({
  selector: 'app-thumbnail-masonry',
  templateUrl: './thumbnail-masonry.component.html',
  styleUrls: ['./thumbnail-masonry.component.css']
})
export class ThumbnailMasonryComponent implements OnInit {

  public photoList = Array<PhotoDetails>();
  public count: number;
  public isBusy = false;
  public switchingFilter = false;
  private hoveringPhoto: number;
  private masonry: Masonry;
  private photosLoaded = 0;
  private screenWidth: number;

  public photoBasePath: string;

  public masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    horizontalOrder: false,
    initLayout: false,
    originLeft: true,
    originTop: false
  };

  @Input('photos') set photos(value: PhotoDetails[]) {
    this.switchingFilter = true;
    this.photoList = value;
    setTimeout(() => {
      this.switchingFilter = false;
      if (typeof this.masonry !== 'undefined') {
        this.masonry.reloadItems();
      }
    });
  }

  @Input('photoCount') set photoCount(count: number) {
    this.count = count;
  }

  @Input('busy') set busy(busy: boolean) {
    this.isBusy = busy;
  }

  @Output() loadMore = new EventEmitter();

  @ViewChildren('masonryItem') masonryItemRef: ElementRef[];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private appConstants: AppConstants,
              private photoDataService: PhotoDataService,
              private lightbox: Lightbox,
              private fullScreenService: FullscreenService,) {
    this.photoBasePath = appConstants.PHOTO_BASE_PATH;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  onNgMasonryInit($event: Masonry) {
    console.log($event);
    this.masonry = $event;
  }

  resetPhotosLoaded(): void {
    this.photosLoaded = 0;
  }

  showTitle(pkPhoto: number) {
    this.hoveringPhoto = pkPhoto;
  }

  getTitleVisibilityStyle(pkPhoto) {
    if (this.hoveringPhoto === pkPhoto) {
      return {display: 'block', transition: 'transform .5s ease'};
    } else {
      return {display: 'none', transition: 'transform .5s ease'};
    }
  }

  open(index: number): void {
    // open lightbox
    if (this.screenWidth > 870) {
      this.lightbox.open(this.photoList, index);
    } else {
      this.fullScreenService.open(this.photoList, index);
    }
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  hasMorePhotos(): boolean {
    if (typeof this.photoList !== 'undefined') {
      return   this.photoList.length < this.count;
    } else {
      return false;
    }
  }

  doLoadMore(): void {
    this.loadMore.emit();
  }

  photoLoad(): void {
    this.photosLoaded++;
    if (this.photosLoaded === this.photoList.length) {
      this.masonry.layout();
    }
  }

  // addPhotos(newPhotos: PhotoDetails[]) {
  //   for (const photo of newPhotos) {
  //     this.photoList.push(photo);
  //   }
  // }
  //
  // replacePhotos(newPhotos: PhotoDetails[]) {
  //   this.masonry.removeAllItems().subscribe(() => {
  //     this.photoList = [];
  //
  //     this.masonry.setAddStatus('add');
  //     this.addPhotos(newPhotos);
  //     this.masonry.reOrderItems();
  //   });
  // }
}
