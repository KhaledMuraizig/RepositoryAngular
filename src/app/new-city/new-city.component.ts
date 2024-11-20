import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { country } from '../DTOs/country';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../service/city.service';
import { CountryService } from '../service/country.service';
import { ActivatedRoute } from '@angular/router';
import { city } from '../DTOs/city';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css']
})
export class NewCityComponent implements OnInit{

  @ViewChild('countryName') countrySelect!: ElementRef;
  isEdit:boolean=false
  countryName!:string
  countries!:country[]
  cityForm!:FormGroup
  cityId!:number
  constructor(private formBuilder:FormBuilder, private cityService:CityService,private countryService:CountryService, private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.formBuild()
    this.fillCountry()

    if(this.activatedRoute.snapshot.queryParams['id']!=undefined){
      this.cityId=parseInt(this.activatedRoute.snapshot.queryParams['id'])
      this.countryName=this.activatedRoute.snapshot.queryParams['countryName']
      this.edit()
      this.isEdit=true
    }
   
  }

  fillCountry(){
    this.countryService.loadAll().subscribe({
      next:data=>{
        this.countries=data
      },
      error:()=>console.log()
    })
  }

  formBuild(){

    this.cityForm=this.formBuilder.group({
      txtName:['',Validators.required],
      ddlcountry:['',Validators.required]
    })
  }

  save() {
    debugger;
    if (this.cityForm.valid) {
      const selectedText = this.countrySelect.nativeElement.options[this.countrySelect.nativeElement.selectedIndex].text;
      var countryInfo = new country();
      countryInfo.name = selectedText;
      var newCity = new city();
      newCity.name = this.cityForm.value['txtName'];
      newCity.country_Id = countryInfo.id;
      newCity.country = countryInfo;
      this.cityService.insert(newCity).subscribe({
        next: () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "City has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (err) => console.error("Error saving city:", err),
      });
    }
  }
  

  edit(){
   this.cityService.load(this.cityId).subscribe({
    next:data=>{
      this.cityForm.controls['txtName'].setValue(data.name)
    }
   })
  }
  update(){
    debugger
    if(this.cityForm.valid){
      var newCountry=new country
      newCountry.name=this.countryName
      newCountry.id=parseInt(this.cityForm.value['ddlcountry'])
      var newCity =new city
      newCity.id=this.cityId
      newCity.name=this.cityForm.value['txtName']
      newCity.country_Id=parseInt(this.cityForm.value['ddlcountry'])
      newCity.country=newCountry
      this.cityService.update(newCity).subscribe({
        next:()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "City has been updated",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error:()=>console.log()
      })
    }
  }
}
