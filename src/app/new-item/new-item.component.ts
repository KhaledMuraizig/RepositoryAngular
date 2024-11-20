import { Component, OnInit } from '@angular/core';
import { warehouse } from '../DTOs/warehouse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../service/item.service';
import { WarehouseService } from '../service/warehouse.service';
import { ActivatedRoute } from '@angular/router';
import { item } from '../DTOs/item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  isEdit:boolean=false
  itemId!:number
  warehouses!:warehouse[]
  itemForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private itemService:ItemService,private warehouseSerivce:WarehouseService, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {

    this.formBuild()
    this.fillWarehouse()

    if(this.activatedRoute.snapshot.queryParams['id']!=undefined){
      this.itemId=parseInt(this.activatedRoute.snapshot.queryParams['id'])
      this.edit()
      this.isEdit=true
    }

  }

  formBuild(){
    this.itemForm=this.formBuilder.group({
    txtName:['',Validators.required],
    txtKU_Code:[''],
    txtQty:['',Validators.required],
    txtCostPrice:['',Validators.required],
    txtMSRP_Price:['',Validators.required],
    ddlWarehouse:['',Validators.required]
    })
  }

  fillWarehouse(){
    this.warehouseSerivce.loadAll().subscribe({
      next:data=>{
        this.warehouses=data
      },
      error:()=>console.log()
    })
  }

  save(){
    if(this.itemForm.valid){
      var newItem=new item
      newItem.name=this.itemForm.value['txtName']
      newItem.kU_Code=this.itemForm.value['txtKU_Code']
      newItem.qty=this.itemForm.value['txtQty']
      newItem.costPrice=this.itemForm.value['txtCostPrice']
      newItem.MSRP_Price=this.itemForm.value['txtMSRP_Price']
      newItem.Warehouse_Id=this.itemForm.value['ddlWarehouse']
      this.itemService.insert(newItem).subscribe({
        next:()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error:()=>console.log()
      })
  }

}

edit(){
  this.itemService.load(this.itemId).subscribe({
    next:data=>{
      this.itemForm.controls['txtName'].setValue(data.name)
      this.itemForm.controls['txtKU_Code'].setValue(data.kU_Code)
      this.itemForm.controls['txtQty'].setValue(data.qty)
      this.itemForm.controls['txtCostPrice'].setValue(data.costPrice)
      this.itemForm.controls['txtMSRP_Price'].setValue(data.MSRP_Price)
      this.itemForm.controls['ddlWarehouse'].setValue(data.warehouse_Id)
    },
    error:()=>console.log()
    
  })
}

update(){
  debugger
  if(this.itemForm.valid){
    var newItem=new item
    newItem.id=this.itemId
    newItem.name=this.itemForm.value['txtName']
    newItem.kU_Code=this.itemForm.value['txtKU_Code']
    newItem.qty=parseInt(this.itemForm.value['txtQty'])
    newItem.costPrice=parseFloat(this.itemForm.value['txtCostPrice'])
    newItem.MSRP_Price=parseFloat(this.itemForm.value['txtMSRP_Price'])
    newItem.Warehouse_Id=parseInt(this.itemForm.value['ddlWarehouse'])
    this.itemService.update(newItem).subscribe({
      next:()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "item has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error:()=>console.log()
    })
  }
}
}
