import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService{
    public url : string;

    constructor(private _http: HttpClient){
        this.url = global.url;
    }

    singup(user: any, gettoken = false): Observable<any>{
        
        if(gettoken != false){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }
}
