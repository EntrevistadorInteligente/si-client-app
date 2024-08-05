import { TestBed } from '@angular/core/testing';

import { NotificationCommunicationService } from './notification-communication.service';

describe('NotificationCommunicationService', () => {
  let service: NotificationCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
