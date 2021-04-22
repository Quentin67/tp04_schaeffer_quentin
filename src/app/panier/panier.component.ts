import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {Reference} from '../../shared/models/reference';
import {PanierState} from '../../shared/states/panier-state';
import {DelReference} from '../../shared/actions/panier.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  reference$ : Observable<Reference[]>;
  references: Reference[];

  constructor(private store:Store, private router:Router) { }

  ngOnInit(): void {
    this.reference$ = this.store.select(PanierState.getReferences);
    this.reference$.subscribe(item => this.references = item);
  }

  onReferenceRemoved(reference:Reference){
    this.store.dispatch(new DelReference(reference));
  }
  onCommandePanier(){
    this.router.navigate(['/commandeAdress']);
  }

}
