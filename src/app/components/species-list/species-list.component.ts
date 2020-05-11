import {Component, HostListener, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SpeciesDataService} from '../../services/species-data.service';
import {SpeciesGroup} from '../../domain/species-group';
import {Species} from "../../domain/species";
import {PhotoDetails} from "../../domain/photo-details";
import {TripDataService} from "../../services/trip-data.service";
import {Lightbox} from "../lightbox/services/lightbox.service";
import {NavigationService} from "../../services/navigation.service";
import {FullscreenService} from "../fullscreen/services/fullscreen.service";

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit, OnDestroy {

  private speciesGroups: SpeciesGroup[] = [];
  private speciesSubscription: Subscription;

  public mammalGroups: SpeciesGroup[];
  public birdGroups: SpeciesGroup[];
  public mammalCount;
  public birdCount;
  public busy = false;

  private screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private speciesDataService: SpeciesDataService,
              private lightbox: Lightbox,
              private fullscreenService: FullscreenService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.navigationService.navigateTo('species');
    this.mammalCount = 0;
    this.birdCount = 0;
    this.busy = true;
    this.speciesSubscription = this.speciesDataService.getSpecies().subscribe((data: SpeciesGroup[]) => {
      this.speciesGroups = data;
      this.populateMammalGroups();
      this.populateBirdGroups();
      this.busy = false;
    });

    this.speciesDataService.loadSpecies();
  }

  ngOnDestroy(): void {
    this.speciesSubscription.unsubscribe();
  }

  getNextMammalCount(): number {
    this.mammalCount++;
    if (this.mammalCount > this.getTotalMammals()) {
      this.mammalCount = 1;
    }
    return this.mammalCount;
  }

  getNextBirdCount(): number {
    this.birdCount++;
    if (this.birdCount > this.getTotalBirds()) {
      this.birdCount = 1;
    }
    return this.birdCount;
  }

  getTotalMammals(): number {
    let totalMammals = 0;
    if ((typeof this.mammalGroups !== 'undefined') && (this.mammalGroups.length > 0)) {
      for (const speciesGroup of this.mammalGroups) {
        totalMammals += speciesGroup.species.length;
      }
    }
    return totalMammals;
  }

  getTotalBirds(): number {
    let totalBirds = 0;
    if ((typeof this.birdGroups !== 'undefined') && (this.birdGroups.length > 0)) {
      for (const speciesGroup of this.birdGroups) {
        totalBirds += speciesGroup.species.length;
      }
    }
    return totalBirds;
  }

  hasPhotoLink(photo: PhotoDetails) {
    return typeof photo.location !== 'undefined';
  }

  open(photo): void {
    const photos: PhotoDetails[] = [];
    photos.push(photo);
    if (this.screenWidth > 480) {
      this.lightbox.open(photos, 0);
    } else {
      this.fullscreenService.open(photos, 0);
    }
  }

  private populateMammalGroups(): void {
    this.mammalGroups = [];
    for (const group of this.speciesGroups) {
      if (group.birds == 0) {
        this.mammalGroups.push(group);
      }
    }
  }

  private populateBirdGroups(): void {
    this.birdGroups = [];
    for (const group of this.speciesGroups) {
      if (group.birds == 1) {
        this.birdGroups.push(group);
      }
    }
  }


}
