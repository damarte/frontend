import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiPredictionComponent } from './bi-prediction.component';

describe('BiPredictionComponent', () => {
  let component: BiPredictionComponent;
  let fixture: ComponentFixture<BiPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
