import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { country } from '../DTOs/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private client:HttpClient) {

  }

  insert(country:country):Observable<any>{
   return this.client.post('http://localhost/RepositoryApp/api/Country',country)
  }

  loadAll():Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Country/GetAll')
  }

  delete(id:number):Observable<any>{
   return this.client.delete('http://localhost/RepositoryApp/api/Country?id='+id)
  }

  load(id:number):Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Country/Load?id='+id)
 }

 update(country:country):Observable<any>{
   return this.client.put('http://localhost/RepositoryApp/api/Country',country)
 }
}
