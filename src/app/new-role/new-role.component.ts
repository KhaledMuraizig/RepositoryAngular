import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { role } from '../DTOs/role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  roleForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private accountService:AccountService){

  }

  ngOnInit(): void {
    
    this.formBuild()
  }

  formBuild(){

    this.roleForm=this.formBuilder.group({
      txtName:['',Validators.required]
    })
  }

  save(){
    debugger
    if(this.roleForm.valid){
      var newRole=new role
      newRole.name=this.roleForm.value['txtName']
      newRole.roleId=""
      this.accountService.addRole(newRole).subscribe({
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

}
