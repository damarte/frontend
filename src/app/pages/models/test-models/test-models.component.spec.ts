import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModelsComponent } from './test-models.component';

describe('TestModelsComponent', () => {
  let component: TestModelsComponent;
  let fixture: ComponentFixture<TestModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
