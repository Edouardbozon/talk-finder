import { Component, OnInit, Input } from '@angular/core';

export interface Talk {
  title: string;
}

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
