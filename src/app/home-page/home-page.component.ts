import { Component, Input, OnInit } from '@angular/core';
import { UserAlertDialogComponent } from '../user-alert-dialog/user-alert-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
  constructor(
     public dialog: MatDialog,
     public router: Router,
     public authService: AuthService,
     public http: HttpClient
     ) {}

  isRegisterChecked: boolean = false;
  getUserDetails: any = {};
  userObj: any = {};
  userArray: any = [];
  isRegisterStudent: any;
  isRegisterStaff: any;
  isRegisterOption: any;
  isPasswordError: boolean = false;
  registerForm:any;
  staffRegisterForm:any;
  login: boolean = false;
  studentRegister: boolean = true;
  staffRegister: boolean = true;
  
  loginDetails: any ={
    email: '',
    password:''
  }

  registerMap: any = {
    'studentsDetails': {
      firstName: '',
      lastName: '',
      registerNumber: '',
      gender: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      college: '',
      department: '',
      year: '',
      isUserType: 'STUDENT'
    },
    'staffDetails': {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      college: '',
      department: '',
      isUserType: 'STAFF'
    },
   
  }
  ngOnInit():any {

  this.registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',  [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    college: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    registerNumber: new FormControl('', [Validators.required]),
    
  }),

  this.staffRegisterForm= new FormGroup({
    staffFirstName: new FormControl('', [Validators.required]),
    staffLastName: new FormControl('',  [Validators.required]),
    staffEmail: new FormControl('', [Validators.required, Validators.email]),
    staffPhoneNumber: new FormControl('', [Validators.required]),
    staffPassword: new FormControl('', [Validators.required]),
    staffConfirmPassword: new FormControl('', [Validators.required]),
    staffDepartment: new FormControl('', [Validators.required]),
    staffCollege: new FormControl('', [Validators.required]),
  });


  /* if(this.registerMap.studentsDetails.password != this.registerMap.studentsDetails.confirmPassword){
    return this.isPasswordError = true;
    } else if(this.registerMap.staffDetails.password != this.registerMap.staffDetails.confirmPassword){
     return this.isPasswordError = true;
    }*/
  }

  goHome(){
    console.log('ksjsj');
    const path = "/home"; // Replace with the path you want to refresh
    window.location.href = path + '?t=' + new Date().getTime();
  }


  loginUserDetails(){
    this.authService.login(this.loginDetails)
    console.log('login details---->',this.loginDetails);
   
  }

  saveUserDetails(){
    console.log("user details", this.registerMap)
    if(this.registerMap?.studentsDetails.isUserType == 'STUDENT' &&  this.registerMap?.studentsDetails.firstName != ''){
      this.authService.signUp(this.registerMap?.studentsDetails)
    } else if(this.registerMap?.staffDetails.isUserType == 'STAFF' && this.registerMap?.staffDetails.firstName != '' ) {
      this.authService.signUp(this.registerMap?.staffDetails)
    }
  
  }


  /*openDialog(){
    let dialogRef = this.dialog.open(UserAlertDialogComponent, {
      width:'250px',
      data: {
        name: this.userObj.user_name,
        password: this.userObj.password
      },
    })

    dialogRef.afterClosed();
  }

  chcekUserDeatails(){
    for(var i=0; i<this.userArray.length; i++){
      var eachUser = this.userArray[i];
      if(eachUser === this.userObj){
        this.openDialog()
      }
      console.log('user', eachUser)
    }
    
  }*/

}
