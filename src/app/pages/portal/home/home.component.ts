import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InfiniteScrollOptions } from 'src/app/shared/components/infinite-scroll/infinite-scroll.setting';
import { AnuncioService } from 'src/app/service/anuncio/anuncio.service';
import { InfiniteScrollComponent } from 'src/app/shared/components/infinite-scroll/infinite-scroll.component';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from 'src/app/service/sessao/sessao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ left: '-500px', opacity: 0 }),
            animate('0.3s ease-out', style({ left: 0, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 0, opacity: 1 }),
            animate('0.3s ease-in', style({ left: '-500px', opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {
  
  @ViewChild(InfiniteScrollComponent) infiniteScroll!: InfiniteScrollComponent;

  categorias$!: Observable<any>
  localizacaoUsuario: any;

  constructor(private service: AnuncioService,
    private sessaoService: SessaoService,
    private categoriaService: CategoriaService,
    router: Router,
    activatedRoute: ActivatedRoute) {
      super(router, activatedRoute)
  }

  alterarEndereco() {
    this.sessaoService.limparLocalizacao();
    window.location.reload()
  }
  
  ngAfterViewInit(): void {
    this.infiniteScrollSettings = {
      req: this.service,
      count: 20,
      sort: 'estrelas',
      direction: 'DESC',
      params: this.formFilter
    }
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.get();
    this.localizacaoUsuario = this.sessaoService.getSessao()
    this.readFilter((filter) => {
      this.formFilter = filter;
      
      if(!filter.distancia)
        this.formFilter.distancia = 60;
    });
  }

  formFilter = {
    titulo: undefined,
    categoria: undefined,
    avaliacao: undefined,
    distancia: 60
  }

  filter: boolean = false;
  infiniteScrollSettings!: InfiniteScrollOptions;

  paginar(page: number) {
    return ;
  }

  reset() {
    this.infiniteScroll.atualizarFiltro();
  }

  filtrar() {
    this.doFilter(this.formFilter, (filtro) => {
      this.reset();
    });
  }

  get labelDistancia() {
    return this.formFilter && this.formFilter.distancia > 1 ? 'Kilômetros' : 'Kilometro'
  }

  montarEstrelas(estrelas: number) {
    let arr = []
    for(let i = 0; i < estrelas; i++)
      arr.push('fa-solid fa-star')

    for(let i = 0; i <= 5 - arr.length; i++)
      arr.push('fa-regular fa-star')

    return arr;
  }
}
