import { Component, OnInit, Input } from '@angular/core';
import {FirstService} from '../service/first.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {

  constructor(private firstService : FirstService) { }

  regEx1 = /[A-Za-z]{2,30}/;
  regEx2 = /[A-Za-z0-9]{2,30}/;
  regEx3 = /^[0-9]{5}$/;

  @Input() erreur : boolean = true;
  
  nom : string = "";
  prenom : string = "";
  ville : string = "";
  codePostal : string = "";
  adresse : string = "";

  error : boolean = true;
  
  ngOnInit(): void {
  }

  click () {
    alert("Enregistrement !");
    this.firstService.log("click formulaire");
    
  }

}
