import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Talk } from '../../models/talk.model';

@Component({
  selector: 'tf-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalkComponent implements OnInit {
  @Input() talk: Talk;

  imgLoaded = false;
  isHovered = false;

  constructor() {}

  ngOnInit() {}
}
