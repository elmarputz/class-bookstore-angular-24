import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {ToastrService} from "ngx-toastr";
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'bs-book-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './book-details.component.html',
  styles: ``
})
export class BookDetailsComponent implements OnInit{
  book:Book = BookFactory.empty();

  constructor(private bs:BookStoreService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              public authService: AuthenticationService
            ){
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe((b:Book)=>this.book=b);
  }

  getRating(num: number){
    return new Array(num);
  }

  removeBook() {
    if(confirm("Buch wirklich löschen?")){
      this.bs.remove(this.book.isbn).subscribe(
        ()=> {
          this.router.navigate(['../'],
          {relativeTo:this.route});
          this.toastr.success('Buch gelöscht!',"KWM Bookstore");
        }
      );
    }
  }
}
