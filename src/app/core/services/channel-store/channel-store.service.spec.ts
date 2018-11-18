import { TestBed } from '@angular/core/testing';

import { ChannelStore } from './channel-store.service';

describe('ChannelStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelStore = TestBed.get(ChannelStore);
    expect(service).toBeTruthy();
  });
});
