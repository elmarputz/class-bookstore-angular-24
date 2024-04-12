import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { Book } from './shared/book';


@Component({
  selector: 'bs-root',
  standalone: true,
  imports: [RouterOutlet,BookListComponent,BookDetailsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'bookstore';
  listOn = true;
  detailsOn = false; 

  book: Book | undefined;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }

}
