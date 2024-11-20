import { Component, OnInit } from '@angular/core';
import { item } from '../DTOs/item';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit{

  items!:item[]
  constructor(private itemService:ItemService,private router:Router){

  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.itemService.loadAll().subscribe({
      next:data=>{
        this.items=data
      },
      error:()=>console.log()
    })
  }

  delete(id:number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.delete(id).subscribe({
          next:()=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          this.loadAll()
          },
          error:()=>console.log()
        })
        
      }
    });
  }

  edit(id:number){
    this.router.navigate(['Home/NewItem'],{queryParams:{id:id}})
  }
}
