import { Observable } from "rxjs";
import { ServiceBase } from "src/app/service/service.base";

export class InfiniteScrollOptions {
    req!: ServiceBase;
    count!: number;
    sort?: string | undefined;
    direction?: 'ASC' | 'DESC' | undefined;
    params?: any
}