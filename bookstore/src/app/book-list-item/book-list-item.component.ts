import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'a.bs-book-list-item',
  standalone: true,
  imports: [],
  templateUrl: './book-list-item.component.html',
  styles: ``
})

export class BookListItemComponent {
   @Input() book: Book | undefined;
}
