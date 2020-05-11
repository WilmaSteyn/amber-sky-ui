import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnDestroy {

  public activePage = 'portfolio';

  private locationSubscription: Subscription;
  public hamburgerMenuVisible = false;

  constructor(private router: Router,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.locationSubscription = this.navigationService.getLocation().subscribe((data: string) => {
      this.activePage = data;
    });
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  getSelectedClass(pageId: string) {
    if (this.activePage === pageId) {
      return 'selected';
    } else {
      return '';
    }
  }

  routeTo(routeId: string): void {
    this.hamburgerMenuVisible = false;
    this.activePage = routeId;
    this.router.navigate([routeId]);
  }

  showHamburgerMenu(): void {
    this.hamburgerMenuVisible = !this.hamburgerMenuVisible;
  }

}
