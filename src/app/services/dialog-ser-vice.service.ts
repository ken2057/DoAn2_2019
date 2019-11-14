import { DialogtemplateComponent } from './../dialogtemplate/dialogtemplate.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(
    public dialog: MatDialog) { }
    openModal(title:string, message: string) {
      const dialogConfig = new MatDialogConfig();

      // dialogConfig.disableClose = true;
      dialogConfig.data = {
          title: title,
          message:message
      };
      dialogConfig.width = '400px';


      const dialogRef = this.dialog.open(DialogtemplateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog was closed')
          console.log(result)
      });
    }


  }
