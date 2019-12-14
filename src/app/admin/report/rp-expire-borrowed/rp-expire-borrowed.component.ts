import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/api/report.service';

@Component({
  selector: 'app-rp-expire-borrowed',
  templateUrl: './rp-expire-borrowed.component.html',
  styleUrls: ['./rp-expire-borrowed.component.css']
})
export class RpExpireBorrowedComponent implements OnInit {
  dateRP;
  reports;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private rpService: ReportService
  ) { }

  ngOnInit() {
    let t = new Date()
    this.dateRP = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()
  }

  getRp() {
    this.spinner.show()

    this.rpService.getRpExpireBorrowed(this.cookieService.get('token'), this.dateRP)
        .subscribe(Response => {
          this.reports = Response.body['reports']
          this.spinner.hide()
        }, error => {
          this.spinner.hide()
          console.error(error.error);
          this.dialogService.openModal('Error', error.error)
        })
  }

  public clickBtnFind() {
    if (this.dateRP != "")
      this.getRp()
  }
}
