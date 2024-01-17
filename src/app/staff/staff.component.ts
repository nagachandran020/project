import { Component,ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { AuthService } from '../auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {

  constructor(public sharedService: SharedServiceService,
    public authService: AuthService,
    public snackBar: MatSnackBar) {
  }

  finalDataArr: any = [];
  deansettingsArr: any = [];
  isDeanSaved: boolean = false;
  hodPublishDiv:boolean = true;
  hodInfoDiv:boolean = false;

  permissionDataArr:any = [];


  ngOnInit():any {

    this.eventsDataArr;
    // this.finalDataArr;
    // this.permissionDataArr;
    
    var data:any = this.authService.eventLoaclStorager();
    if (data !== null) {
      this.eventsDataArr = JSON.parse(data);
    }

    console.log('this.events', this.eventsDataArr)
    console.log('login type',this.authService?.userDetails)



for (var i = 0; i < this.eventsDataArr.length; i++) {
  var eventData = Object.values(this.eventsDataArr[i]);
  for (var j = 0; j < eventData.length; j++) {
    var data: any = eventData[j];
    if (data.length != 0 && Array.isArray(data)) {
      let filteredArray = data.filter(obj =>
        obj.venue !== '' && obj.event !== '' && obj.dateTime !== ''
      );
      this.finalDataArr.push(filteredArray);
      console.log('hi--', this.finalDataArr);
    }
  }
}



    var data:any = this.deanLocalStorager();
    if (data !== null) {
      this.finalDataArr = JSON.parse(data)
    }

    if(this.finalDataArr.length > 0){
      for(i =0; i < this.finalDataArr.length; i++){
        for(j = 0; j < this.finalDataArr[i].length; j++){
          var permissionData:any = this.finalDataArr[i][j];
          if(permissionData.isApproved == false){
            this.permissionDataArr.push(permissionData);
            console.log('permission', this.permissionDataArr)
          }
        }
      }
    }

    // var value: any = this.keyLogger();
    // if(value != null){
    //   console.log('val--', value);
    //   this.isDeanSaved = value;
    // }

    var permissionResource:any = this.authService.publishFormStorager();
    if (permissionResource !== null) {
      console.log('per', this.permissionDataArr)
      this.permissionDataArr = JSON.parse(permissionResource)
    }



  }


  eventsDataArr: any = [
    {   
        'BSC_CS':[{deptName: 'BSc CS', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete', approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
        'MSC_CS':[{deptName: 'MSc CS', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
        'MSC_IT':[{deptName: 'MSc IT', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete', approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}]
    },

    {

      'BCA_CA':[{deptName: 'BCA CA', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCA_DS':[{deptName: 'BCA DS', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'MCA_CA':[{deptName: 'MCA CA', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'MSC_ADS':[{deptName: 'MSc ADS', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}]

    },

    {
      'BCOM_COM':[{deptName: 'B.Com Com', event: '', venue: '', date: '', time: '', addEvent:'add_cicle',deleteEvent: 'delete', approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_INF':[{deptName: 'B.Com Inf Sys Mgmt', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete', approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_INTER':[{deptName: 'B.Com(Hons) Inter A/c & Fin', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_PROF':[{deptName: 'B.Com(Hons) Prof A/c', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_STR':[{deptName: 'B.Com(Hons) Str Fin', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_CORP':[{deptName: 'B.Com Corp Sec', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'BCOM_AC':[{deptName: 'B.Com A/c & Fin', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'MCOM_COM':[{deptName: 'M.Com Com', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false,fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}],
      'MCOM_AC':[{deptName: 'M.Com A/c & Fin', event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete',  approve: 'check', reject:'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'}]
    }
      
  

  ]

  getEventsList(){
    console.log('evnts data ', this.eventsDataArr)
    this.authService.getData(this.eventsDataArr)
    
  }





  onFileSelected(event:any, index1:any) {
    var obj ={
      'name': event.target.files[0].name,
      'size': event.target.files[0].size,
      'type': event.target.files[0].type,
      'webkitRelativePath': event.target.files[0].webkitRelativePath
    }
    this.permissionDataArr[index1].fileUpload = obj;
    console.log('dat--->', this.permissionDataArr[index1].fileUpload)
    if (this.permissionDataArr[index1].fileUpload) {
      const reader = new FileReader();
      reader.readAsText(this.permissionDataArr[index1].fileUpload, 'UTF-8');
      reader.onload = (evt) => {
        const fileDeatils = evt.target ? evt.target.result : null;
        // console.log('filwe', fileDeatils);
      };
      reader.onerror = (evt) => {
        console.error('Error reading file');
      };
    }
  }

  publishForm(){
    console.log('permission', this.permissionDataArr);
    this.authService.publishFormData(this.permissionDataArr)
  }
  
  
  deanSettings(){
    var isSaved = true;
    console.log('dean-->', this.finalDataArr);
    localStorage.setItem('deanSettings', JSON.stringify(this.finalDataArr))
    localStorage.setItem('key', JSON.stringify(isSaved));
    this.snackBar.open('Saved Successfully', 'Close', {
      duration: 5000
    });
    

  }

  deanLocalStorager(){
    // localStorage.clear();
    return localStorage.getItem('deanSettings');
  }

  keyLogger(){
    return localStorage.getItem('key');
  }



  deleteEvent(mainIndex:any, subDeptIndex: any, value: any ){  
    console.log("deleted",this.eventsDataArr, mainIndex, subDeptIndex, value);
    this.eventsDataArr[mainIndex][value].splice(subDeptIndex, 1);
  }


  addEvent(value: any){
    var departmentArr = [];
  console.log("added",this.eventsDataArr,value)

  for(var i = 0; i < this.eventsDataArr.length; i++){
    departmentArr = this.eventsDataArr[i][value];
    if(departmentArr && departmentArr.length > 0){
      departmentArr.push({
        event: '', venue: '', date: '', time: '' , addEvent:'add_cicle',deleteEvent: 'delete', approval: 'check', reject: 'close', isApproved: false, fileUpload: {}, uploadIcon: 'cloud_upload', fileDownload: '', downloadIcon: 'cloud_download'
      })
    }
  }

  console.log("added",this.eventsDataArr)

  }


}
