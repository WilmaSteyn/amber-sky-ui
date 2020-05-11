import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../domain/trip';
import {AppConstants} from '../../config/app-constants';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  @Input() trip: Trip;

  public photoBasePath: string;

  constructor(private appConstants: AppConstants,
              private navigationService: NavigationService) {
    this.photoBasePath = appConstants.PHOTO_BASE_PATH;
  }

  ngOnInit(): void {
    this.navigationService.navigateTo('trips')
  }

}
