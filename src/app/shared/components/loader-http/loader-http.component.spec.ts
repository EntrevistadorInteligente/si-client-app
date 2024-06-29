import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderHttpComponent } from './loader-http.component';

describe('LoaderHttpComponent', () => {
  let component: LoaderHttpComponent;
  let fixture: ComponentFixture<LoaderHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderHttpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
