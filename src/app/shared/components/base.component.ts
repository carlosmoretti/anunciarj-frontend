import { OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";

export abstract class BaseComponent {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute) {
        }

    doFilter(filtro: any, req: (filter: any) => void) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: filtro,
            queryParamsHandling: 'merge'
        })
        
        req(filtro);
    }

    readFilter(fn: (args: any) => void) {
        fn(JSON.parse(JSON.stringify(this.activatedRoute.snapshot.queryParams)))
    }
}