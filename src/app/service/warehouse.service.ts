import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { warehouse } from '../DTOs/warehouse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private client:HttpClient) {

  }

  insert(warehouse:warehouse):Observable<any>{
   return this.client.post('http://localhost/RepositoryApp/api/Warehouse',warehouse)
  }

  loadAll():Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Warehouse/LoadAll')
  }

  delete(id:number):Observable<any>{
   return this.client.delete('http://localhost/RepositoryApp/api/Warehouse?id='+id)
  }

  load(id:number):Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Warehouse/Load?id='+id)
  }

  update(warehouse:warehouse):Observable<any>{
   return this.client.put('http://localhost/RepositoryApp/api/Warehouse',warehouse)
  }
}
