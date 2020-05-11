import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailMasonryComponent } from './thumbnail-masonry.component';

describe('ThumbnailMasonryComponent', () => {
  let component: ThumbnailMasonryComponent;
  let fixture: ComponentFixture<ThumbnailMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
