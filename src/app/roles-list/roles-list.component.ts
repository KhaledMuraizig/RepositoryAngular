import { Component, OnInit } from '@angular/core';
import { role } from '../DTOs/role';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit{

  roles!:role[]
  constructor(private accountService:AccountService){

  }

  ngOnInit(): void {
   this.loadAll()
  }

  loadAll(){
    debugger
    this.accountService.getRoles().subscribe({
      next:data=>{
        this.roles=data
      },
      error:()=>console.log()
    })
  }

}