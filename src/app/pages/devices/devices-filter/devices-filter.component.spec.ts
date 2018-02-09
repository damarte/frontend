import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesFilterComponent } from './devices-filter.component';

describe('DevicesFilterComponent', () => {
  let component: DevicesFilterComponent;
  let fixture: ComponentFixture<DevicesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
