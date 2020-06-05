import { Injectable } from '@angular/core';
import {AppConstants} from '../config/app-constants';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Trip} from '../domain/trip';

@Injectable({
  providedIn: 'root'
})
export class SpecialGalleryDataService {

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) { }

  private tripSubject: Subject<Trip[]> = new Subject<Trip[]>();

  public retrieveTrip(pkSpecialGallery: number): void {
    const getUrl = this.appConstants.API_LOCATION + 'specialgalleries/read.php?pkSpecialGallery=' + pkSpecialGallery;
    this.httpClient.get<Trip[]>(getUrl).subscribe(data => {
      this.tripSubject.next(data);
    });
  }

  public getTrip(): Observable<Trip[]> {
    return this.tripSubject.asObservable();
  }
}
