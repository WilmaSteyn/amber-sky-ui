import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private locationSubject: Subject<string> = new Subject<string>();

  constructor() { }

  public getLocation(): Observable<string> {
    return this.locationSubject.asObservable();
  }

  public navigateTo(location: string): void {
    this.locationSubject.next(location);
  }
}
