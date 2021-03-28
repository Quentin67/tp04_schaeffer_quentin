import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {AddReference} from '../../../shared/actions/panier.action';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  referenceDetails: {reference: string, designation :string, prix:number, description: string}

  constructor(private route: ActivatedRoute, private store:Store) { }

  ref : string = "";
  descriptions = [
    {reference: "x1", designation: "Linux", prix: 10, description: "Un os où on peut tout faire"},
    {reference: "x2,", designation: "Windows", prix: 15, description: "C'est pas un os pour dev"},
    {reference: "x3", designation: "Angular", prix: 5, description: "on sait pas trop comment ça marche c'est un peu magique"}
  ]
  
  ngOnInit(): void {
    this.ref = this.route.snapshot.paramMap.get('id');
    console.log(this.ref)
    this.referenceDetails = this.descriptions.find(item => item.reference == this.ref);
    console.log(this.referenceDetails)
  }
  onAddPanier(){
    this.store.dispatch(new AddReference({"reference":this.referenceDetails.reference}));
  }



}
