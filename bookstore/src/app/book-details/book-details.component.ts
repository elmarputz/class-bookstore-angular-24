import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styles: ``
})
export class BookDetailsComponent {

  @Input() book: Book | undefined;
  @Output() showListEvent = new EventEmitter<any>();

  getRating(num: number) {
    return new Array(num);
  }

  showBookList() {
    this.showListEvent.emit();
  }

}
