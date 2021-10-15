import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router){

    }

    redirect(flag: boolean):any{
        if(!flag){
            this._router.navigate(['/login']);
        }
        return true;
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            this._userService.getIdentity();
            this._userService.getIdentity();

            return this.redirect(this._userService.getIdentity() && this._userService.getIdentity());
    }
}