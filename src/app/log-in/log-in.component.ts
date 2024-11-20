import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { signIn } from '../DTOs/signIn';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{

  logInForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private accountService:AccountService, private router:Router){

  }

  ngOnInit(): void {
    this.formBuild()
  }

  formBuild(){

    this.logInForm=this.formBuilder.group({
      txtUsername:['',Validators.required],
      txtPassword:['',Validators.required]
    })
  }

  logIn(){
    var newSignIn =new signIn()
    newSignIn.username=this.logInForm.value['txtUsername']
    newSignIn.password=this.logInForm.value['txtPassword']

    this.accountService.logIn(newSignIn).subscribe({
      next:data=>{
        localStorage.setItem("security",data.tokenValue)

        this.accountService.getRoleByUsername(this.logInForm.value['txtUsername']).subscribe({
          next:data=>{
            localStorage.setItem("role",data)
            this.router.navigate(['/Home'])

          },
          error:()=>console.log()
        })
      },
      error:()=>console.log()
    })
  }

}
