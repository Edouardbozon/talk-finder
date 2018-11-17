import { TestBed } from '@angular/core/testing';

import { ChannelFinder } from './channel-finder.service';

describe('ChannelFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelFinder = TestBed.get(ChannelFinder);
    expect(service).toBeTruthy();
  });
});
