import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { country } from '../DTOs/country';
import { city } from '../DTOs/city';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../service/warehouse.service';
import { CountryService } from '../service/country.service';
import { CityService } from '../service/city.service';
import { ActivatedRoute } from '@angular/router';
import { warehouse } from '../DTOs/warehouse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {

  @ViewChild('countryName') selectedCountry!:ElementRef
  @ViewChild('cityName') selectedCity!:ElementRef
  isEdit:boolean=false
  cityName!:string
  countryName!:string
  warehouseId!:number
  countries!:country[]
  cities!:city[]
  warehouseForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private warehouseService:WarehouseService, private countryService:CountryService,
     private cityService:CityService,private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.formBuild()
    this.fillCountries()
    this.fillCities()

    if(this.activatedRoute.snapshot.queryParams['id']!=undefined){
      this.warehouseId=this.activatedRoute.snapshot.queryParams['id']
      this.cityName=this.activatedRoute.snapshot.queryParams['cityName']
      this.countryName=this.activatedRoute.snapshot.queryParams['countryName']
      this.load()
      this.isEdit=true
    }
    

  }

  formBuild(){
    this.warehouseForm=this.formBuilder.group({
      txtName:['',Validators.required],
      txtDescription:['',Validators.required],
      ddlCountry:['',Validators.required],
      ddlCity:['',Validators.required]

    })
  }

  fillCountries(){
    this.countryService.loadAll().subscribe({
      next:data=>{
        this.countries=data
      },
      error:()=>console.log()
    })
  }
  fillCities(){
    this.cityService.loadAll().subscribe({
      next:data=>{
        this.cities=data
      },
      error:()=>console.log()
    })
  }

  save(){
    debugger
    if(this.warehouseForm.valid){
      const selectedCountryName = this.selectedCountry.nativeElement.options[this.selectedCountry.nativeElement.selectedIndex].text;
      const selectedCityName = this.selectedCity.nativeElement.options[this.selectedCity.nativeElement.selectedIndex].text;
      var newWarehouse=new warehouse
      newWarehouse.name=this.warehouseForm.value['txtName']
      newWarehouse.description=this.warehouseForm.value['txtDescription']
      newWarehouse.country_Id=parseInt(this.warehouseForm.value['ddlCountry'])
      newWarehouse.city_Id=parseInt(this.warehouseForm.value['ddlCity'])
      newWarehouse.city.name=selectedCityName
      newWarehouse.city.country.name=selectedCountryName
      this.warehouseService.insert(newWarehouse).subscribe({
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
  load(){
    this.warehouseService.load(this.warehouseId).subscribe({
      next:data=>{
        this.warehouseForm.controls['txtName'].setValue(data.name)
        this.warehouseForm.controls['txtDescription'].setValue(data.description)
        this.warehouseForm.controls['ddlCountry'].setValue(data.country_Id)
        this.warehouseForm.controls['ddlCity'].setValue(data.city_Id)
      },
      error:()=>console.log()
    })
  }
  update(){
    debugger
    if(this.warehouseForm.valid){
      var newWarehouse=new warehouse
      var cityInfo=new city
      var countryInfo=new country
      cityInfo.id=parseInt(this.warehouseForm.value['ddlCity'])
      cityInfo.name=this.cityName
      countryInfo.id=parseInt(this.warehouseForm.value['ddlCountry'])
      countryInfo.name=this.countryName
      cityInfo.country=countryInfo
      newWarehouse.city=cityInfo
      newWarehouse.country=countryInfo
      newWarehouse.id=this.warehouseId
      newWarehouse.name=this.warehouseForm.value['txtName']
      newWarehouse.description=this.warehouseForm.value['txtDescription']
      newWarehouse.country_Id=parseInt(this.warehouseForm.value['ddlCountry'])
      newWarehouse.city_Id=parseInt(this.warehouseForm.value['ddlCity'])
      this.warehouseService.update(newWarehouse).subscribe({
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