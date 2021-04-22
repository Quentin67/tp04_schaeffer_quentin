import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-commande',
  templateUrl: './formulaire-commande.component.html',
  styleUrls: ['./formulaire-commande.component.css']
})
export class FormulaireCommandeComponent implements OnInit {

  constructor(private router:Router) { }

  lastName: String;
  firstName: String;
  address:String;
  zipCode: Number;
  city:String;
  ngOnInit(): void {
  }
  validateCommande(){
    this.router.navigate(['/commandeCreditCard']);
  }
}
