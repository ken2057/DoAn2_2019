import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { DialogService } from '../services/dialog.service';
import { ManangerService } from '../api/mananger.service';
import { SubjectService } from '../api/subject.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataLoaded = false
  configs = []
  subjects = []
  txtSubject = ""
  clickedSubject = ""

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private manService: ManangerService,
    private subjectService: SubjectService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    this.getConfigs()
    this.getSubjects()
  }

  resetValue() {
    this.clickedSubject = ""
    this.txtSubject = ""

    this.spinner.show()
    this.getConfigs()
    this.getSubjects()
  }

  getConfigs() {
    this.manService.getConfigs(this.cookieService.get('token'))
        .subscribe(Response => {
          this.configs = Response.body['configs']
        }, error => {
          this.dialogService.openModal('Error', error.error)
        })
  }

  getSubjects() {
    this.subjectService.getSubjects()
        .subscribe(Response => {
          this.subjects = Response.body['subjects']
          this.dataLoaded = true;
          this.spinner.hide()
        }, error => {
          this.dialogService.openModal('Error', error.error)
          this.spinner.hide()
        })
  }

  postSubject(action: string) {
    // when is empty
    if(this.txtSubject == "") {
      this.dialogService.openModal("Error", "Please enter subject name")
      return
    }

    this.spinner.show()
    this.subjectService.postSubject(this.cookieService.get('token'), this.txtSubject, action, this.clickedSubject)
        .subscribe(Response => {
          this.spinner.hide()
          this.resetValue()
        }, error => {
          this.dialogService.openModal('Error', error.error)
          this.spinner.hide()
        })
  }

  // Public function
  public clickSubject(subject: string) {
    this.txtSubject = subject
    this.clickedSubject = subject
  }

  public keydown_txtSubject(event) {
    if (event.key === "Enter") {
      if(this.clickedSubject != "")
        this.postSubject("edit")
      else
        this.postSubject("add")
    }
  }

  public delSubject(subject: string) {
    this.txtSubject = subject
    this.postSubject("delete")
  }

  public addSubject() {
    this.postSubject("add")
  }

  public editSubject() {
    // catch when enable html button
    if(this.clickedSubject == "") {
      this.dialogService.openModal("Error", "Nice try...")
      return
    }
    
    this.postSubject("edit")
  }
}
