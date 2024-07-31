import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChatComponent } from './audio-chat.component';

describe('AudioChatComponent', () => {
  let component: AudioChatComponent;
  let fixture: ComponentFixture<AudioChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
