import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckModelComponent } from './truck-model.component';

describe('ProductComponent', () => {
  let component: TruckModelComponent;
  let fixture: ComponentFixture<TruckModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TruckModelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
