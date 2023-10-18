import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalizacaoService {
    constructor(private http: HttpClient){
    }

    get(endereco: string) {
        let params = new HttpParams()
            .append('endereco', endereco)
        return this.http.get('/api/restrito/localizacao', { params })
    }
}