import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book, Author, Image } from "../shared/book";
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { BookStoreService } from '../shared/book-store.service';
import { RouterLink } from '@angular/router';

@Component({
  selector:'bs-book-list',
  standalone: true,
  imports: [ BookListItemComponent,RouterLink],
  templateUrl: './book-list.component.html'
})


export class BookListComponent implements OnInit {


  books: Book[] = [];

  constructor (private bs: BookStoreService) { }

  ngOnInit(): void {
    
    this.books = this.bs.getAll();
   
    console.log(this.books);
  }

}
