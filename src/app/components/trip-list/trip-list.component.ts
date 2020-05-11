import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TripDataService} from '../../services/trip-data.service';
import {Trip} from '../../domain/trip';
import {Lightbox} from "../lightbox/services/lightbox.service";
import {PhotoDetails} from "../../domain/photo-details";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {

  private tripSubscription: Subscription;
  public trips: Trip[];

  public busy = false;

  constructor(private tripDataService: TripDataService) { }

  ngOnInit(): void {
    this.busy = true;
    this.tripSubscription = this.tripDataService.getTrips().subscribe((data: Trip[]) => {
      this.trips = data;
      this.busy = false;
    });
  }

  ngOnDestroy(): void {
    this.tripSubscription.unsubscribe();
  }

}
