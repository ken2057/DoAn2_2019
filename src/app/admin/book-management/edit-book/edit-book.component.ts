import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  public onCancel() {
    this.router.navigate(['/Admin/BookManagement']);
  }
}
