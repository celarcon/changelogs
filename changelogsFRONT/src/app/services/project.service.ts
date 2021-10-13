import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";
import { param } from "jquery";

@Injectable()
export class ProjectService{
    public url : string;

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    getProjects(): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'projects', {headers: headers});
    }

    getProject(): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'getProject/'+1, {headers: headers});
    }

    setProject(project: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        let params = JSON.stringify(project);

        return this._http.post(this.url+'createProject', params, {headers: headers});
    }
}
