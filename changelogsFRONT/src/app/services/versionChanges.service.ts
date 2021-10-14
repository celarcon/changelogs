import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";
import { UserService } from '../services/user.service';

@Injectable()
export class VersionChangesService{
    public url : string;

    constructor( 
        private _http: HttpClient,
        private _userService: UserService
        ){
        this.url = global.url;
    }

    getVersionsChanges(idProject: number, idVersion: number): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject+'/version/'+idVersion+'/versionsChanges', {headers: headers});
    }

    getVersionChanges(idProject: number, idVersion: number,idVersionChange: number): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject+'/version/'+idVersion+'/versionChanges/'+idVersionChange, {headers: headers});
    }

    setVersionChanges(idProject: string,idVersion: string, versionChanges: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                        .set('Authorization', this._userService.getToken());
        let params = JSON.stringify(versionChanges);

        return this._http.post(this.url+'project/'+idProject+'/version/'+idVersion+'/versionChanges', params, {headers: headers});
    }

    editVersionChanges(idProject: number, idVersion: number, versionChanges: any): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());
        
        let params = JSON.stringify(versionChanges);
    

        return this._http.put(this.url+'project/'+idProject+'/version/'+idVersion+'/versionChanges/'+versionChanges.id, params, {headers: headers});
    }

    deleteVersionChanges(idProject: any, idVersion: any, idVersionChanges: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());

        return this._http.delete(this.url+'project/'+idProject+'/version/'+idVersion+'/versionChanges/'+idVersionChanges, {headers: headers});
    }
}
