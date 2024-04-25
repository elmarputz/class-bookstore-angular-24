import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'bs-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter <string>();
  foundBooks: Book[] =[];
  isLoading = false;
  @Output() bookSelected = new EventEmitter<Book>();

  constructor(private bs: BookStoreService){
  }

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=> this.isLoading = true))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(()=> this.isLoading = false))
      .subscribe((books) => {
        this.foundBooks = books;
        console.log(books);
      });
  }

}
