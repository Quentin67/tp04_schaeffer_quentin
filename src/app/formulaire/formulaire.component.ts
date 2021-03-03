import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  valid1 : boolean = true;
  valid2 : boolean = false;
  prenom : string = "toto";
  
  click : string = "";
  constructor() { }

  listArticles  = ["livre","ordinateur","stylo","verre"];

  ngOnInit(): void {
  }

  click1 () {
    console.log ("click");
    this.click = "click1";
    this.valid1 = false;
    this.valid2 = true;

  }

  click2 () {
    console.log ("click");
    this.click = "click2";
    this.valid1 = true;
    this.valid2 = false;

  }
  

}
