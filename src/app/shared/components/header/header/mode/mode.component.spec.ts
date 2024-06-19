import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeComponent } from './mode.component';

describe('ModeComponent', () => {
  let component: ModeComponent;,data: { animation: [routingAnimation]}
  let fixture: ComponentFixture<ModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
