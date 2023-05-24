import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightslistComponent } from './flightslist.component';

describe('FlightslistComponent', () => {
  let component: FlightslistComponent;
  let fixture: ComponentFixture<FlightslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightslistComponent]
    });
    fixture = TestBed.createComponent(FlightslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
