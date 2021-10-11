import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class ProjectService{
    public url : string;

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    getProjects(): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'getProjects',null, {headers: headers});
    }
}
