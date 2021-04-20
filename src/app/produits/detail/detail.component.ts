import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {AddReference} from '../../../shared/actions/panier.action';
import { FirstService } from '../service/first.service';
import {Observable,of,from, TimeoutError} from 'rxjs';
import { Reference } from 'src/shared/models/reference';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  referenceDetails$ : Observable<Reference>;

  referenceDetails : {id: string, reference?: string, titre?: string, prix?:string};

  constructor(private route: ActivatedRoute, private store:Store, private firstService : FirstService) { }

  id : string = "";

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.referenceDetails$ = this.firstService.getDetails(this.id);
    this.referenceDetails$.subscribe(item => this.referenceDetails = item );

    console.log(this.referenceDetails)
  }
  onAddPanier(id: string, prix: string, ref: string, titre: string){
    this.store.dispatch(new AddReference({"id":id,"reference":ref,"titre": titre,"prix":prix}));
  } 

}
