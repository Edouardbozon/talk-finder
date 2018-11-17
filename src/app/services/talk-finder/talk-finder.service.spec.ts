import { TestBed } from '@angular/core/testing';

import { TalkFinderService } from './talk-finder.service';

describe('TalkFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkFinderService = TestBed.get(TalkFinderService);
    expect(service).toBeTruthy();
  });
});
