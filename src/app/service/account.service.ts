import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { role } from '../DTOs/role';
import { Observable } from 'rxjs';
import { signUp } from '../DTOs/SIgnUp';
import { signIn } from '../DTOs/signIn';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private client:HttpClient) { 

  }

  addRole(role:role):Observable<any>{
    return this.client.post('http://localhost/RepositoryApp/api/Account/AddRole',role)
  }

  getRoles():Observable<any>{
    return this.client.get('http://localhost/RepositoryApp/api/Account/GetRoles')
  }

  adduser(signUp:signUp):Observable<any>{
    return this.client.post('http://localhost/RepositoryApp/api/Account/CreatAccount',signUp)
  }

  getUsers():Observable<any>{
    return this.client.get('http://localhost/RepositoryApp/api/Account/GetUsers')
  }
  logIn(signIn:signIn):Observable<any>{
    return this.client.post('http://localhost/RepositoryApp/api/Account/LogIn',signIn)
  }
  getRoleByUsername(username:string):Observable<any>{
    return this.client.get('http://localhost/RepositoryApp/api/Account/GetRolesByUsername?username='+username)
  }
}
