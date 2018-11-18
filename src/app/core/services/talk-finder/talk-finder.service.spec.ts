import { TestBed } from '@angular/core/testing';

import { TalkFinder } from './talk-finder.service';

describe('TalkFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkFinder = TestBed.get(TalkFinder);
    expect(service).toBeTruthy();
  });
});
