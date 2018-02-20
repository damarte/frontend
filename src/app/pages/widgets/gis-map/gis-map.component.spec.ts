import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GisMapComponent } from './gis-map.component';

describe('GisMapComponent', () => {
  let component: GisMapComponent;
  let fixture: ComponentFixture<GisMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GisMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GisMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
