import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AnuncioService } from 'src/app/service/anuncio/anuncio.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  form: any;
  constructor(private breadcrumbService: BreadcrumbService,
    private anuncioService: AnuncioService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.anuncioService.get(this.activatedRoute.snapshot.params['id'])
      .subscribe((e: any) => {
        this.form = e;
        this.breadcrumbService.set('@anunciante', e.titulo)
      })
  }

}
