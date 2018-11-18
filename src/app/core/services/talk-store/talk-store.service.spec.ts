import { TestBed } from '@angular/core/testing';

import { TalkStore } from './talk-store.service';

describe('TalkStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkStore = TestBed.get(TalkStore);
    expect(service).toBeTruthy();
  });
});
