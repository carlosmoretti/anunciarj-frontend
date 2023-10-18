import { HttpClient, HttpParams } from "@angular/common/http";

export abstract class ServiceBase {
    
    constructor(protected http: HttpClient, protected url: string) {
    }

    private isPropValida = (prop: any) => prop && prop != 'null';

    public get(id: number) {
        return this.http.get(this.montarUrl() + '/' + id);
    }

    paginate(page: number, size: number, sort: string | undefined, direction: 'ASC' | 'DESC' | undefined, filter: any) {
        let params = new HttpParams();
        console.log(filter);

        if(sort && direction) {
            params = params.append('prop', sort);
            params = params.append('direction', direction)

            for(let key of Object.keys(filter)) {
                const item = filter[key]
                if(Array.isArray(item)) {
                    for(let prop of item) {
                        if(this.isPropValida(prop))
                            params = params.append(key, prop);
                    }
                } else {
                    if(this.isPropValida(item))
                        params = params.append(key, item);
                }
            }
        }

        return this.http.get(this.montarUrl() + '/page/' + page + '/size/' + size, { params });
    }

    add(params: any) {
        return this.http.post(this.montarUrl(), params)
    }

    protected montarUrl() {
        return 'api' + this.url
    }
}