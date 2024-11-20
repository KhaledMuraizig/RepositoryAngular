import { Component, OnInit } from '@angular/core';
import { role } from '../DTOs/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { signUp } from '../DTOs/SIgnUp';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  roles!:role[]
  signUpForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private accountService:AccountService){

  }

  ngOnInit(): void {
    this.formBuild()
    this.fillRoles()
  }

  formBuild(){
    this.signUpForm=this.formBuilder.group({
      txtFName:['',Validators.required],
      txtLName:['',Validators.required],
      txtUsername:['',Validators.required],
      txtEmail:['', [Validators.required, Validators.email]],
      txtPassword:['',Validators.required],
      ddlRole:['',Validators.required]
    })
  }

  fillRoles(){
    this.accountService.getRoles().subscribe({
      next:data=>{
        this.roles=data
      },
      error:()=>console.log()
    })
  }

  CreatAccount(){
    if(this.signUpForm.valid){
      var newUser =new signUp
      newUser.firstName=this.signUpForm.value['txtFName']
      newUser.lastName=this.signUpForm.value['txtLName']
      newUser.username=this.signUpForm.value['txtUsername']
      newUser.email=this.signUpForm.value['txtEmail']
      newUser.password=this.signUpForm.value['txtPassword']
      newUser.roleName=this.signUpForm.value['ddlRole']

      this.accountService.adduser(newUser).subscribe({
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
