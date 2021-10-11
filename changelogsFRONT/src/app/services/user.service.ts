import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService{
    public url : string;
    public identity: any;
    public token: any;

    constructor(private _http: HttpClient){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    singup(user: any, gettoken = false): Observable<any>{
        
        if(gettoken != false){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = localStorage.getItem('identity');

        if( identity && identity != null && identity != undefined && identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if( token && token != null && token != undefined && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }
}
