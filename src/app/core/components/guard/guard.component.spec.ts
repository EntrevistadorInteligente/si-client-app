import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardComponent } from './guard.component';

describe('GuardComponent', () => {
  let component: GuardComponent;
  let fixture: ComponentFixture<GuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
