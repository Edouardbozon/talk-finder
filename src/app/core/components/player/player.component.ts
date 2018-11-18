import {
  Component,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Talk } from '../../models/talk.model';
import { CONTAINER_DATA } from 'src/app/utils/container-injector';

@Component({
  selector: 'tf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  constructor(@Inject(CONTAINER_DATA) public talk: Talk) {}
}
