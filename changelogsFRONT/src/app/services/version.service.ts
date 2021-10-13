import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";
import { param } from "jquery";

@Injectable()
export class VersionService{
    public url : string;

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    getVersions(idProject: number): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject+'/versions', {headers: headers});
    }

    getVersion(): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/1/version/1', {headers: headers});
    }

    setVersion(project: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        let params = JSON.stringify(project);

        return this._http.post(this.url+'createVersion', params, {headers: headers});
    }
}
