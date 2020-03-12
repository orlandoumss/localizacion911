import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgeoComponent } from './searchgeo.component';

describe('SearchgeoComponent', () => {
  let component: SearchgeoComponent;
  let fixture: ComponentFixture<SearchgeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchgeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchgeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
