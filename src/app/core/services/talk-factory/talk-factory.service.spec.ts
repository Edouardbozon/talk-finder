import { TestBed } from '@angular/core/testing';

import { TalkFactory } from './talk-factory.service';

describe('TalkFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkFactory = TestBed.get(TalkFactory);
    expect(service).toBeTruthy();
  });
});
