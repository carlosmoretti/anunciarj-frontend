import { Injectable } from "@angular/core";
import { ServiceBase } from "../service.base";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SessaoService extends ServiceBase {
    constructor(http: HttpClient) {
        super(http, '/restrito/sessao')
    }

    atualizarToken(token: string, x: number, y: number) {
        return this.http.put(this.montarUrl() + '/' + token, { x, y })
    }

    armazenarSessao(token: string) {
        localStorage.setItem('session_id', token);
    }

    getSessao() {
        return localStorage.getItem('session_id');
    }

    getLocalizacao() {
        return this.http.get(this.montarUrl())
    }

    override add(params: any): Observable<Object> {
        const url = this.montarUrl() + '?recaptchaToken=' + params.token;
        return this.http.post(url, params)
    }
}