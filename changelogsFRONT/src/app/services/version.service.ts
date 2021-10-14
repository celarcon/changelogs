import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";
import { UserService } from '../services/user.service';

@Injectable()
export class VersionService{
    public url : string;

    constructor(
        private _http: HttpClient,
        private _userService: UserService
        ){
        this.url = global.url;
    }

    getVersions(idProject: number): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject+'/versions', {headers: headers});
    }

    getVersion(idProject:number,idVersion:number): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject+'/version/'+idVersion, {headers: headers});
    }

    setVersion(idProject: string, version: any): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());

        let params = JSON.stringify(version);

        return this._http.post(this.url+'project/'+idProject+'/version', params, {headers: headers});
    }

    editVersion(version: any): Observable<any>{
        let idProject = version.project_id;
        let idVersion = version.id;
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());
        
        let params = JSON.stringify(version);

        return this._http.put(this.url+'project/'+idProject+'/version/'+idVersion, params, {headers: headers});
    }

    deleteVersion(idProject: any, idVersion: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());

        return this._http.delete(this.url+'/project/'+idProject+'/version/'+idVersion, {headers: headers});
    }

}
