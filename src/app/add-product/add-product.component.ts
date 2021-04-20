import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstService } from '../produits/service/first.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  ref: string = "";
  titre: string = "";
  price: number  = 0;
  constructor(private firstService: FirstService, private router: Router) { }

  ngOnInit(): void {
  }
  ajout(){
    this.firstService.addProduct(this.ref, this.titre, this.price).subscribe(res => {
      this.router.navigate(['/produits/catalogue']);
    })
  }

}
