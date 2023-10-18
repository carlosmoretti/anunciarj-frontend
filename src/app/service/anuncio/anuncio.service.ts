import { Injectable } from "@angular/core";
import { ServiceBase } from "../service.base";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AnuncioService extends ServiceBase {
    constructor(http: HttpClient) {
        super(http, '/restrito/anuncio');
    }
}