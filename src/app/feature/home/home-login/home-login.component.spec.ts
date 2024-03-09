import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoginComponent } from './home-login.component';

describe('HomeLoginComponent', () => {
  let component: HomeLoginComponent;
  let fixture: ComponentFixture<HomeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
