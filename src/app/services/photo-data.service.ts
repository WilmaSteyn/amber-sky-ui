import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AppConstants} from '../config/app-constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PhotoDetails} from '../domain/photo-details';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoDataService {

  private photoSubject: Subject<PhotoDetails[]> = new Subject<PhotoDetails[]>();
  private photoCountSubject: Subject<number> = new Subject<number>();

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) {
  }

  public retrievePhotos(pkCategory: number, offset: number): void {
    let readUrl = this.appConstants.API_LOCATION + 'photodetails/read.php?offset=' + offset + '&limit=' + this.appConstants.PHOTOS_PER_PAGE;
    if (pkCategory > -1) {
      readUrl += '&pkCategory=' + pkCategory;
    }
    this.httpClient.get<PhotoDetails[]>(readUrl).subscribe((data: PhotoDetails[]) => {
      this.photoSubject.next(data);
    });
  }

  public retrieveSpecialGalleryPhotos(pkSpecialGallery: number): void {
    const readUrl = this.appConstants.API_LOCATION + 'photodetails/readspecial.php?pkSpecialGallery=' + pkSpecialGallery;
    this.httpClient.get<PhotoDetails[]>(readUrl).subscribe((data: PhotoDetails[]) => {
      this.photoSubject.next(data);
    });
  }

  public countPhotos(pkSelectedCategory: number): void {
    let readUrl = this.appConstants.API_LOCATION + 'photos/count.php';

    if (pkSelectedCategory > -1) {
      readUrl += '?pkCategory=' + pkSelectedCategory;
    }

    this.httpClient.get<number>(readUrl).subscribe((data: number) => {
      this.photoCountSubject.next(data);
    });
  }

  public countSpecialGalleryPhotos(pkSpecialGallery: number): void {
    const readUrl = this.appConstants.API_LOCATION + 'photos/count.php?pkSpecialGallery=' + pkSpecialGallery;
    this.httpClient.get<number>(readUrl).subscribe((data: number) => {
      this.photoCountSubject.next(data);
    });
  }

  public getPhotos(): Observable<PhotoDetails[]> {
    return this.photoSubject.asObservable();
  }

  public getPhotoCount(): Observable<number> {
    return this.photoCountSubject.asObservable();
  }

}
