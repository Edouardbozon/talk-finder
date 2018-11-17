import { TestBed } from '@angular/core/testing';

import { YouTubeTalkFactory } from './talk-factory.service';

describe('TalkFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YouTubeTalkFactory = TestBed.get(YouTubeTalkFactory);
    expect(service).toBeTruthy();
  });
});
