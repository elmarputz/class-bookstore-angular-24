import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import { BookFormErrorMessages } from './book-form-error-message';
import { Book } from '../shared/book';

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
  errors: { [key: string]: string } = {};
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs : BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({});
    this.images = this.fb.array([]);
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
    this.buildThumbnailsArray();
    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [ this.book.title, Validators.required], 
      subtitle: this.book.subtitle,
      isbn: [
        this.book.isbn, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      description: this.book.description, 
      rating: [
        this.book.rating, [
          Validators.min(0), 
          Validators.max(10)

        ]
      ], 

      images: this.images,
      published: [ this.book.published, Validators.required ]
    });

    this.bookForm.statusChanges.subscribe(() => 
      this.updateErrorMessage()
    );
    
  }


  buildThumbnailsArray() {
    if (this.book.images) {
      this.images = this.fb.array([]);

      for (let img of this.book.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]), 
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }

    }

  }

  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title: null }));
  }

  updateErrorMessage() {
    console.log("Is invalid? " + this.bookForm.invalid);
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (
        control && 
        control.dirty && 
        control.invalid && control.errors && 
        control.errors[message.forValidator] && 
        !this.errors[message.forControl]
      ) {
        console.log(control.errors);
        this.errors[message.forControl] = message.text;
      }

    }


  }

  submitForm() {
    console.log(this.bookForm.value);

    this.bookForm.value.images = this.bookForm.value.images.filter(
      (thumbnail: { url:string; }) => thumbnail.url
    );

    const book: Book = BookFactory.fromObject(this.bookForm.value);
    book.authors = this.book.authors;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe(res => {
        this.router.navigate(["../../books/", book.isbn], {
          relativeTo: this.route
        });
      });


    } else {
      book.user_id = 1;
      console.log(book);
    }

  }

}
