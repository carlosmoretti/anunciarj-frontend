import { Injectable } from "@angular/core";
import { ServiceBase } from "../service.base";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class SessaoService extends ServiceBase {
    constructor(http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        super(http, '/restrito/sessao')
    }

    limparLocalizacao() {
        localStorage.removeItem('an.geo.x');
        localStorage.removeItem('an.geo.y');
    }

    armazenarLocalizacao(x: number, y: number) {
        localStorage.setItem('an.geo.x', x.toString());
        localStorage.setItem('an.geo.y', y.toString());
    }

    getSessao() {
        return {
            x: localStorage.getItem('an.geo.x'),
            y: localStorage.getItem('an.geo.y')
        }
    }

    isSessaoIniciada() {
        const sessao = this.getSessao()
        return sessao.x && sessao.y
    }

}