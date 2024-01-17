import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(public http: HttpClient) { }

  isShare: boolean = false;
  baseApiUrl = 'http://localhost:2000/api';







}


