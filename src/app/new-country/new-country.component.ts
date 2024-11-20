import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../service/country.service';
import { ActivatedRoute } from '@angular/router';
import { country } from '../DTOs/country';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css']
})
export class NewCountryComponent implements OnInit{

  isEdit:boolean=false
  countryId!:number
  countryForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private countryService:CountryService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.formBuild()
  }

  formBuild(){
    this.countryForm=this.formBuilder.group({
      txtnName:['',Validators.required]
    })

    if(this.activatedRoute.snapshot.queryParams['id']!=undefined){
      this.countryId=parseInt(this.activatedRoute.snapshot.queryParams['id'])
      this.edit()
      this.isEdit=true
    }
  }

  save(){
    if(this.countryForm.valid){
      var newCountry=new country
      newCountry.name=this.countryForm.value['txtnName']
      this.countryService.insert(newCountry).subscribe({
        next:()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Country has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error:()=>console.log()
      })
    }
  }

  edit(){
    this.countryService.load(this.countryId).subscribe({
      next:data=>{
        this.countryForm.controls['txtnName'].setValue(data.name)
      },
      error:()=>console.log()
    })
  }

  update(){
    if(this.countryForm.valid){
      var newCountry= new country
      newCountry.id=this.countryId
      newCountry.name=this.countryForm.value['txtnName']
      this.countryService.update(newCountry).subscribe({
        next:()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Country has been updated",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error:()=>console.log()
      })
    }
  }


}

