import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {Book} from "../shared/book";

@Component({
  selector: 'bs-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }
  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn], {relativeTo: this.route})
  }
}
