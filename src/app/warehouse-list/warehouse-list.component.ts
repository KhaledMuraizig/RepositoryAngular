import { Component, OnInit } from '@angular/core';
import { warehouse } from '../DTOs/warehouse';
import { WarehouseService } from '../service/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit{

  warehouses!:warehouse[]
  constructor(private warehoseService:WarehouseService,private router:Router){

  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll()
  {
    this.warehoseService.loadAll().subscribe({
      next:data=>{
        this.warehouses=data
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
        this.warehoseService.delete(id).subscribe({
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

  edit(id:number,cityName:string,countryName:string){
    this.router.navigate(['Home/NewWarehouse'],{queryParams:{id:id,cityName:cityName,countryName:countryName}})
  }
  newWarehouse(){
    this.router.navigate(['Home/NewWarehouse'])
  }
}
