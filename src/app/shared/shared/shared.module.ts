import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { InfiniteScrollComponent } from '../components/infinite-scroll/infinite-scroll.component';
import { MapComponent } from '../components/map/map.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    InfiniteScrollComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbModule,
    BreadcrumbComponent,
    InfiniteScrollComponent,
    MapComponent
  ]
})
export class SharedModule { }
