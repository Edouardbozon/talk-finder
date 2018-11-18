import { uuid } from 'src/app/utils/uuid-generator';

export abstract class Entity {
  public uuid: string = uuid();
}
