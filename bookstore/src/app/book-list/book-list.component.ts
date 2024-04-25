import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookListItemComponent} from "../book-list-item/book-list-item.component";
import {BookStoreService} from "../shared/book-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'bs-book-list',
  standalone: true,
  imports: [
    BookListItemComponent,
    RouterLink
  ],
  templateUrl: './book-list.component.html',
  styles: ``
})
export class BookListComponent implements OnInit{
  books: Book[] = [];

  constructor(private bs:BookStoreService) {
  }
  ngOnInit() {
     this.bs.getAll().subscribe(res => this.books = res);
  }
}
