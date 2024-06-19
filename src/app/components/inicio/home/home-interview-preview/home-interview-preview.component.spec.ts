import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInterviewPreviewComponent } from './home-interview-preview.component';

describe('HomeInterviewPreviewComponent', () => {
  let component: HomeInterviewPreviewComponent;
  let fixture: ComponentFixture<HomeInterviewPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeInterviewPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeInterviewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
