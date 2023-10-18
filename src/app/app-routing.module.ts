import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guard/session.guard';
import { SessionComponent } from './pages/session/session.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('../app/pages/portal/portal.module').then(e => e.PortalModule), canActivate: [SessionGuard] },
    { path: 'session', children: [
      { path: '', component: SessionComponent },
      { path: 'registrar/:token', component: SessionComponent, data: { registrar: true }}
    ]},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
