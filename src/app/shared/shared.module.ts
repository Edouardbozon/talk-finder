import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { YoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    OverlayModule,
    YoutubePlayerModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LayoutModule,
    OverlayModule,
    YoutubePlayerModule,
  ]
})
export class SharedModule { }
