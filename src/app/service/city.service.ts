import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { city } from '../DTOs/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private client:HttpClient) {

  }

  insert(city:city):Observable<any>{
   return this.client.post('http://localhost/RepositoryApp/api/City',city)
  }

  loadAll():Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/City/GetCities')
  }

  delete(id:number):Observable<any>{
   return this.client.delete('http://localhost/RepositoryApp/api/City?id='+id)
  }

  load(id:number):Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/City/Load?id='+id)
  }

  update(city:city):Observable<any>{
   return this.client.put('http://localhost/RepositoryApp/api/City',city)
  }
}
