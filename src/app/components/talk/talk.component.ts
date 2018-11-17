import { Component, OnInit, Input } from '@angular/core';
import { Talk } from 'src/app/models/talk.model';

@Component({
  selector: 'tf-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent implements OnInit {
  @Input() talk: Talk;

  constructor() {}

  ngOnInit() {}
}
