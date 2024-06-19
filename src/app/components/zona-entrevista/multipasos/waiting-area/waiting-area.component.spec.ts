import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAreaComponent } from './waiting-area.component';

describe('WaitingAreaComponent', () => {
  let component: WaitingAreaComponent;
  let fixture: ComponentFixture<WaitingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
