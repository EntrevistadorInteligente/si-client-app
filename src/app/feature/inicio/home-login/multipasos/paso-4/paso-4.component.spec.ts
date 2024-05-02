import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso4Component } from './paso-4.component';

describe('Paso4Component', () => {
  let component: Paso4Component;
  let fixture: ComponentFixture<Paso4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paso4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Paso4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
