import { TestBed } from '@angular/core/testing';

import { TalkStoreService } from './talk-store.service';

describe('TalkStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkStoreService = TestBed.get(TalkStoreService);
    expect(service).toBeTruthy();
  });
});
