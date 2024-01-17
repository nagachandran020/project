import { Component, Inject,} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';

@Component({
  selector: 'app-user-alert-dialog',
  templateUrl: './user-alert-dialog.component.html',
  styleUrls: ['./user-alert-dialog.component.css']
})


export class UserAlertDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(){
    this.dialogRef.close();
  }

}
