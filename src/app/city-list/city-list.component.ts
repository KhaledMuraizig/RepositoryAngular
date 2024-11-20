import { Component, OnInit } from '@angular/core';
import { CityService } from '../service/city.service';
import { city } from '../DTOs/city';
import { Router } from '@angular/router';
import { CountryService } from '../service/country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  
  cities!:city[]
  constructor (private cityService:CityService, private router:Router,private countryService:CountryService){

  }
  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.cityService.loadAll().subscribe({
      next:data=>{
        this.cities=data
      },
      error:()=>console.log()
    })
  }

  delete(id:number){
    debugger
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
        this.cityService.delete(id).subscribe({
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

  edit(id:Number,countryName:string){
    this.router.navigate(['Home/NewCity'],{queryParams:{id:id,countryName:countryName}})
  }

  new(){
    this.router.navigate(['Home/NewCity'])
  }
}
