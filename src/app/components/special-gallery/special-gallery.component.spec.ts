import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialGalleryComponent } from './special-gallery.component';

describe('SpecialGalleryComponent', () => {
  let component: SpecialGalleryComponent;
  let fixture: ComponentFixture<SpecialGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
