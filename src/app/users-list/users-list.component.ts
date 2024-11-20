import { Component, OnInit } from '@angular/core';
import { user } from '../DTOs/user';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users!:user[]
  constructor(private accountService:AccountService){

  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.accountService.getUsers().subscribe({
      next:data=>{
        this.users=data
      },
      error:()=>console.log()
    })
  }
}
