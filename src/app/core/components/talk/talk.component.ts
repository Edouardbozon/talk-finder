import { Component, OnInit, Input, ChangeDetectionStrategy, Injector } from '@angular/core';
import { Talk } from '../../models/talk.model';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { PlayerComponent } from '../player/player.component';
import { CONTAINER_DATA } from 'src/app/utils/container-injector';

@Component({
  selector: 'tf-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalkComponent implements OnInit {
  @Input() talk: Talk;

  imgLoaded = false;
  isHovered = false;

  constructor(private overlay: Overlay, private injector: Injector) {}

  ngOnInit() {}

  displayPlayer(e: Event) {
    e.preventDefault();

    const playerOverlayRef = this.overlay.create({ hasBackdrop: true });
    const mountedOverlay = new ComponentPortal(PlayerComponent, null, this.createInjector(this.talk));
    playerOverlayRef.attach(mountedOverlay);
    playerOverlayRef.backdropClick().subscribe(_ => playerOverlayRef.dispose());
  }

  createInjector(talk: Talk): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CONTAINER_DATA, talk);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
