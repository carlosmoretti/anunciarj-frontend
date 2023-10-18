import { Input, Component, ContentChild, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { InfiniteScrollOptions } from './infinite-scroll.setting';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  curPage: number = 0;
  resultados: any[] = []
  ultimaConsulta: Date = new Date();

  @Input() options!: InfiniteScrollOptions;
  @ContentChild('content') content!: TemplateRef<any>;

  ngOnInit(): void {
    this.consultar();

    const _self = this;
    window.onscroll = function(ev) {
      if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        _self.enviarParaFila(() => {
          _self.curPage++;
          _self.consultar();
        })
      }
    };
  }

  enviarParaFila(req: () => void) {
    if(new Date().getTime() - this.ultimaConsulta.getTime() > 300) {
      req();
    }

    this.ultimaConsulta = new Date();
  }

  consultar() {
    this.options.req.paginate(this.curPage, this.options.count, this.options.sort, this.options.direction, this.options.params)
      .subscribe((e: any) => {
        e.content.forEach((el: any) => {
          this.resultados.push(el);
        });
      })
  }

  atualizarFiltro() {
    this.curPage = 0;
    this.resultados = []
    this.consultar();
  }

}
