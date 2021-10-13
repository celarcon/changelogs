import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity: string;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
    this.title = 'ACCESO';
    this.user = new User('', '', '');
    this.status = '';
    this.identity = '';
    this.token= '';
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {

    this._userService.singup(this.user).subscribe(
      (response) => {
        console.log(response);
        if (response.user && response.user.id) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._userService.singup(this.user, true).subscribe(
            response=>{
              console.log(response);
              if(response.token){
                this.token = response.token;
                localStorage.setItem('token', JSON.stringify(this.token));

                this.status = 'success';
                this._router.navigate(['/home']);
              }else{
                this.status = 'error';
              }
            },
            error =>{
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }
}
