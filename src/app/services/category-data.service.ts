import { Injectable } from '@angular/core';
import {AppConstants} from '../config/app-constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../domain/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    const readUrl = this.appConstants.API_LOCATION + 'categories/read.php';

    return this.httpClient.get<Category[]>(readUrl);
  }
}
