import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BookService } from 'src/app/api/book.service';
import { Book } from 'src/app/class/book';
import { ManangerService } from 'src/app/api/mananger.service';
import { SubjectService } from 'src/app/api/subject.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  dataLoaded = false
  bookId: string
  bookDetail: Book

  subjects = []
  selected = [-1, -1, -1]
  selectedValid = true;

  constructor(
    private cookieService: CookieService,
    private bookService: BookService,
    private manService: ManangerService,
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bookDetail = new Book()
    this.bookId = this.route.snapshot.paramMap.get('bookId')
    this.allSubject()
  }

  getBookInfo() {
    // get book info with bookId
    this.bookDetail = new Book()
    this.bookService.getBook(this.bookId)
      .subscribe(response => {
        // set value from respone
        let json = response.body
        this.bookDetail = new Book(
          json['_id'],
          json['name'],
          json['author'],
          json['subjects'] || [],
          json['books'],
          json['image'],
          false,
          json['year_released'],
          json['publisher'],
          json['price']
        )
        // change subjects of books into html drop-box can use
        this.convertToSelectSubjects()
        // all data loaded
        this.dataLoaded = true
      }, error => {
        console.error(error)
      })
  }

  allSubject() {
    // get all subjects exists
    this.subjectService.getSubjects()
      .subscribe(response => {
        let allSubject = response.body['subjects']
        // all the subjects got from API => add id and push into the dict
        this.subjects = allSubject
          .map(t => {
            return { 'id': allSubject.indexOf(t), 'name': t }
          })
        this.subjects.push({ 'id': -1, 'name': 'None' })
        this.subjects.sort(t => t.id)
        // call get book
        this.getBookInfo()
      }, error => {
        console.error(error)
      })
  }

  // change subjects of books into html drop-box can use
  convertToSelectSubjects() {
    // function to add 'None' to list Subjects
    // if subjects.length < 3 => need add 'None' to the list
    const addEmptySubject = (t: number): Array<string> => { if (t == 0) return []; return addEmptySubject(t - 1).concat(['None']) }
    let currentLength = this.bookDetail.subjects.length
    this.bookDetail.subjects = currentLength < 3 ?
      this.bookDetail.subjects.concat(addEmptySubject(3 - currentLength)) : this.bookDetail.subjects
    // map the string from the subjects to the index  got from the allSubject()
    this.selected = this.bookDetail.subjects
      .map(t => {
        let index = -1
        this.subjects.forEach(s => { if (s.name == t) index = s.id })
        return index
      })
  }

  checkChangeSelected() {
    // check valid when change the subject of book
    //  check duplicate subject
    let valid = true
    let fil = this.selected.filter(t => t != -1).map(t => Number(t))
    fil.forEach(t => {
      valid = fil.indexOf(t) == fil.lastIndexOf(t) && valid
    })
    this.selectedValid = valid
  }

  // Public function
  public onCancel() {
    this.router.navigate(['/Admin/BookManagement']);
  }

  public btnSave() {
    // convert selected subject into the book
    let fil = this.selected.filter(t => t != -1).map(t => Number(t))
    this.bookDetail.subjects = fil.map(t => {
      let name = ''
      this.subjects.forEach(s => { if (s.id == t) name = s.name })
      return name
    })

    // update
    this.manService.postEditBook(this.cookieService.get('token'), this.bookDetail)
      .subscribe(response => {
        this.router.navigate(['/Admin/BookManagement'])
      }, error => {
        console.error(error)
      })
  }
}
