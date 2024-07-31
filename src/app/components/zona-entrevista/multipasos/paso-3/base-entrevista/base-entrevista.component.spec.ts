import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEntrevistaComponent } from './base-entrevista.component';

describe('BaseEntrevistaComponent', () => {
  let component: BaseEntrevistaComponent;
  let fixture: ComponentFixture<BaseEntrevistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseEntrevistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
