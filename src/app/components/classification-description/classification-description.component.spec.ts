import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDescriptionComponent } from './classification-description.component';

describe('ClassificationDescriptionComponent', () => {
  let component: ClassificationDescriptionComponent;
  let fixture: ComponentFixture<ClassificationDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
