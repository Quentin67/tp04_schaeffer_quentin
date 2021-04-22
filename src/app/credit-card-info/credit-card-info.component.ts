import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-info',
  templateUrl: './credit-card-info.component.html',
  styleUrls: ['./credit-card-info.component.css']
})
export class CreditCardInfoComponent implements OnInit {

  creditCard:Number;
  name:String;
  month:Number;
  year:Number;
  ccv:Number;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  validatePaiment(){
    alert('Merci pour votre achat, et surtout vos coordonnées de carte bancaire ça payera ma rtx3090 :)) ');
    this.router.navigate(['/catalogue']);
  }
}
