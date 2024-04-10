import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaEntrevistaComponent } from './zona-entrevista.component';

describe('ZonaEntrevistaComponent', () => {
  let component: ZonaEntrevistaComponent;
  let fixture: ComponentFixture<ZonaEntrevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZonaEntrevistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZonaEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
