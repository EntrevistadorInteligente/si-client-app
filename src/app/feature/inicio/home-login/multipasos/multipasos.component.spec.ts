import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipasosComponent } from './multipasos.component';

describe('MultipasosComponent', () => {
  let component: MultipasosComponent;
  let fixture: ComponentFixture<MultipasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipasosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
