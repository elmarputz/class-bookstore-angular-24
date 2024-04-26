import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
      title: this.book.title,
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

}
