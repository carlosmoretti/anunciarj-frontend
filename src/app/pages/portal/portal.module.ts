import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', component: PortalComponent, data: { breadcrumb: 'Anuncios' }, children: [
    { path: '', component: HomeComponent },
    { path: ':id', component: DetailComponent, data: { breadcrumb: {
      alias: 'anunciante'
    }} }
  ]}
]

@NgModule({
  declarations: [
    PortalComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class PortalModule { }
