import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  userMap: any;

  constructor(public http: HttpClient,
     public router: Router,
     public snackBar: MatSnackBar) { }

  baseApiUrl = 'http://localhost:2000/api';
  userToken:any;
  userEmail:any;
  userDetails: any = {};
  eventLists: any;


  login(data: any) {
    const url = this.baseApiUrl + '/login';
    this.http.post(url, data).subscribe(
      (res: any) => {
        console.log('login response---->', res);
        if (res && res.token) {
          this.userToken = res.token;
          this.loginUserDetails();
        } else if (res && res.message) {
          this.snackBar.open(res.message, 'Undo', {
            duration: 5000
          });
        }
      },
      (error: any) => {
        console.log('error', error);
        if (error && error.error && error.error.message) {
          console.log('hhd', error.error.message)
          this.snackBar.open(error.error.message, 'Undo', {
            duration: 5000
          });
        }
      }
    );
  }
  

  loginUserDetails(){
    var tokenResponse: any = jwtDecode(this.userToken);
    console.log('user Detail --->', tokenResponse)
    var loginData = {
      'first_name': tokenResponse?.firstName,
      'last_name': tokenResponse?.lastName,
      'email': tokenResponse?.email,
      'isUserType': tokenResponse?.isUserType,
      'userId': tokenResponse?.userId,
      'isTypeOfLogin': tokenResponse?.isTypeOfLogin
    }

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('loginCredentials', JSON.stringify(loginData));
      var storedData:any = localStorage.getItem('loginCredentials')
      if (storedData !== undefined) {
        var data = JSON.parse(storedData);
        this.userDetails = data;
        console.log('user--', this.userDetails);
      }
    } else {
      console.warn("local storage doesn't support your browser")
    }
    this.userDetails = loginData;
    if(this.userDetails){
      if (this.userDetails?.isUserType == 'STUDENT'){
        this.router.navigate(['/students'])
      } else if(this.userDetails?.isUserType == 'STAFF'){
        this.router.navigate(['/staff'])
      }
    }
  }

  setUserDetails(){
   this.userMap = this.userDetails;
  };

  getUserDetails(){
    return this.userMap
  }


  signUp(data: any){
    try {
      var url = this.baseApiUrl+'/signup';
      this.http.post(url, data).subscribe(
        (res:any) => {
        console.log('sign up response---->', res);
        if (res?.message) {
          this.snackBar.open(res.message, 'Undo', {
            duration: 5000
          });
        }
      },
      (error: any) => {
        console.log('error', error);
        if (error?.error?.message) {
          this.snackBar.open(error.error.message, 'Undo', {
            duration: 5000
          });
        }
      });
    } catch(error) {
      console.log('error', error);
    }
  }


  logout(){
    console.log('logout.....')
    this.router.navigate(['/home']);
  }


 
  getData(data:any){
    var url = this.baseApiUrl+'/saveData';
    this.http.post(url, data).subscribe((res:any) => {
      console.log('reponse/...', res);
      if(res.userId){
        this.updateEachData(data,res.userId);
      }
      
    })
    
  }

  // getEachData(){
  //   var url = this.baseApiUrl+'/getUserData';
  //   this.http.get(url).subscribe((res)=> {
  //     console.log('particular user data--', res);
  //   })
  // }

  updateEachData(data: any, userId:any){
    var body = {
      user_id: userId,
      data: data
    }
    console.log('data-->', body);
    var url = this.baseApiUrl+'/updateUserData';
    this.http.put(url, body).subscribe((res: any)=> {
      var eventDataArr = res.formData;
      console.log('hey--->', eventDataArr)
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem('eventData', JSON.stringify(eventDataArr));
      } else {
        console.warn("local storage doesn't support your browser")
      }
    })
  }
  

  eventLoaclStorager(){
    // localStorage.clear();
    return localStorage.getItem('eventData')
  
  }

  localStorager(){
    return localStorage.getItem('loginCredentials')
  }


  publishFormData(data:any){
     //localStorage.clear();
    localStorage.setItem('publish', JSON.stringify(data));
  }

  publishFormStorager(){
    //localStorage.clear()
    return localStorage.getItem('publish');
  }



 
}

  

