import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogtemplate',
  templateUrl: './dialogtemplate.component.html',
  styleUrls: ['./dialogtemplate.component.css']
})
export class DialogtemplateComponent  {

  modalTitle: string;
  modalMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;

  }
}

