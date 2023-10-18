import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import {  } from "express";
import { Observable } from "rxjs";
import { SessaoService } from "../service/sessao/sessao.service";

@Injectable({
    providedIn: "root"
})
export class SessionGuard implements CanActivate {

    constructor(private router: Router,
        private sessaoService: SessaoService) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const sessionId = this.sessaoService.getSessao();
        const possuiSessaoAberta = sessionId != null;

        if(!possuiSessaoAberta) {
            this.router.navigate(['session'])
            return false;
        }

        return true;
    }
    
}