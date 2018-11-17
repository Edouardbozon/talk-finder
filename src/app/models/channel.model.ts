import { uuid } from '../utils/uuid-generator';

export class Channel {
  public uuid = uuid();

  constructor(public title: string) {

  }
}
