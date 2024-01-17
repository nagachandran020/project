import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedServiceService } from '../shared-service.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  
})
export class StudentsComponent implements OnInit {
  // videoUrl: any;
  // private sanitizer: DomSanitizer
  constructor(
    public snackBar: MatSnackBar,
    public sharedService: SharedServiceService,
    public authService: AuthService) {
      
  }

  eventsDataArr: any = [];
  finalDataArr:any = [];

  ngOnInit():any {

    var data:any = this.authService.publishFormStorager();
    if (data !== null) {
      this.finalDataArr = JSON.parse(data);
      console.log('data', this.finalDataArr)
      
    }


  }

  getApply(){
    this.snackBar.open('Applied successfully','Close', {
      duration: 5000
    });
  }

  
  onDownload(index1: any) {
    var fileData = this.finalDataArr[index1].fileUpload;
    console.log('fileData: ', fileData);
  
    const blob = new Blob([fileData], { type: fileData.type });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  


}


