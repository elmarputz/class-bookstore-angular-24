import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html',
  styles: ``
})
export class BookFormComponent implements OnInit{
  bookForm : FormGroup;
  book = BookFactory.empty();
  isUpdatingBook = false;

  constructor(
    private fb: FormBuilder,
    private bs : BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({});
  }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if(isbn){ // we're updating an existing book
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book =>{
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();
  }

  initBook() {
    this.bookForm = this.fb.group({
      title: this.book.title,
      subtitle: this.book.subtitle
    });
  }
}
