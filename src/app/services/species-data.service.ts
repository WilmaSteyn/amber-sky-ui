import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SpeciesGroup} from '../domain/species-group';
import {AppConstants} from '../config/app-constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeciesDataService {

  private speciesSubject: Subject<SpeciesGroup[]> = new Subject<SpeciesGroup[]>();

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) { }

  public loadSpecies(): void {
    const readUrl = this.appConstants.API_LOCATION + 'speciesgroups/read.php';
    this.httpClient.get<SpeciesGroup[]>(readUrl).subscribe((data: SpeciesGroup[]) => {
      this.speciesSubject.next(data);
    });
  }

  public getSpecies(): Observable<SpeciesGroup[]> {
    return this.speciesSubject.asObservable();
  }

}
