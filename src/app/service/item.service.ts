import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { item } from '../DTOs/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private client:HttpClient) {

  }

  insert(item:item):Observable<any>{
   return this.client.post('http://localhost/RepositoryApp/api/Item',item)
  }
  loadAll():Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Item/LoadAll')
  }

  delete(id:number):Observable<any>{
   return this.client.delete('http://localhost/RepositoryApp/api/Item?id='+id)
  }
  
  load(id:number):Observable<any>{
   return this.client.get('http://localhost/RepositoryApp/api/Item/Load?id='+id)
  }
  update(item:item):Observable<any>{
   return this.client.put('http://localhost/RepositoryApp/api/Item',item)
  }
}
