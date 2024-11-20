import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from '../menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  liMenu:any= [];
  roles!: string;
  filteredMenu:any=[];

  constructor(private router:Router) {
    this.liMenu = menu;
    this.roles = JSON.parse(JSON.stringify(localStorage.getItem('role')))

    this.liMenu.forEach((element:any)=>{ 
      const isInRole=element.role.find((x:any)=>x==this.roles) 
      if(isInRole !=undefined){
         this.filteredMenu.push(element)
         }
        })

  }

  logOut(){
    localStorage.removeItem('security')
    localStorage.removeItem('role')
    this.router.navigate(['/'])
  }
}
