import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CategoriaService {

    constructor(private http: HttpClient){
    }

    get() {
        return this.http.get('/api/restrito/categoria')
    }

}