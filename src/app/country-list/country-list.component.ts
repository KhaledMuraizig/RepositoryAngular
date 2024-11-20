import { Component, OnInit } from '@angular/core';
import { country } from '../DTOs/country';
import { CountryService } from '../service/country.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries!:country[]
  constructor(private countryService:CountryService,private router:Router){

  }
  ngOnInit(): void {
   this.loadAll()
  }

  loadAll(){
    this.countryService.loadAll().subscribe({
      next:data=>{
        this.countries=data
      },
      error:()=>console.log()
    })
  }
  delete(id:number)
  {
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
        this.countryService.delete(id).subscribe({
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
    this.router.navigate(['Home/NewCountry'],{queryParams:{id:id}})
  }
  newCountry(){
    this.router.navigate(['Home/NewCountry'])
  }

}