import { TestBed } from '@angular/core/testing';

import { RecordVoiceService } from './record-voice.service';

describe('RecordVoiceService', () => {
  let service: RecordVoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordVoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
