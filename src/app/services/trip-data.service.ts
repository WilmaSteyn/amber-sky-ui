import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Trip} from '../domain/trip';
import {AppConstants} from '../config/app-constants';
import {HttpClient} from '@angular/common/http';
import {PhotoDetails} from '../domain/photo-details';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) { }

  public getTrips(): Observable<Trip[]> {
    const readUrl = this.appConstants.API_LOCATION + 'trips/read.php';

    return this.httpClient.get<Trip[]>(readUrl);
  }

}
