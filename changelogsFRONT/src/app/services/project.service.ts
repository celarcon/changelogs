import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { global } from "./global";
import { UserService } from '../services/user.service';

@Injectable()
export class ProjectService{
    public url : string;

    constructor(
            private _http: HttpClient,
            private _userService: UserService
            ){
        this.url = global.url;
    }

    getProjects(): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'projects', {headers: headers});
    }

    getProject(idProject: number): Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'project/'+idProject, {headers: headers});
    }

    setProject(project: any): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());
        
        let params = JSON.stringify(project);

        console.log(params);

        return this._http.post(this.url+'project', params, {headers: headers});
    }
    
    editProject(project: any): Observable<any>{
        let idProject = project.id;
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());
        
        let params = JSON.stringify(project);

        return this._http.put(this.url+'project/'+idProject, params, {headers: headers});
    }

    deleteProject(idProject: number): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/json')
                                       .set('Authorization', this._userService.getToken());

        return this._http.delete(this.url+'project/'+idProject, {headers: headers});
    }
}
