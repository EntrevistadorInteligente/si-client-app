import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSinLoginComponent } from './home-sin-login.component';

describe('HomeSinLoginComponent', () => {
  let component: HomeSinLoginComponent;
  let fixture: ComponentFixture<HomeSinLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSinLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSinLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
