import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselComponent } from './carrusel.component';

describe('CarruselComponent', () => {
  let component: CarruselComponent;
  let fixture: ComponentFixture<CarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarruselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
