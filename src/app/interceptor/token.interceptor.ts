import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessaoService } from "../service/sessao/sessao.service";

@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private sessaoService: SessaoService) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        const token = this.sessaoService.getSessao();
        debugger;
        if(token) {
            req = req.clone({
                setHeaders: {
                    sessionId: token
                }
            })

        }

        return next.handle(req);
    }

}