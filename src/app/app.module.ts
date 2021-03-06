import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './auth.guard';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from '../shared/states/panier-state';
import { PanierComponent } from './panier/panier.component';
import {ApiHttpInterceptor} from './api-http.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormulaireCommandeComponent } from './formulaire-commande/formulaire-commande.component';
import { CreditCardInfoComponent } from './credit-card-info/credit-card-info.component';

const appRoutes : Routes = [
  {path:'',component:AccueilComponent},
  {path:'formulaire',component:FormulaireComponent, canActivate: [AuthGuard]},
  {path: 'produits', canActivate: [AuthGuard], loadChildren: () => import('./produits/produits.module').then(m => m.ProduitsModule)},
  {path: 'panier', component:PanierComponent,canActivate: [AuthGuard]},
  {path: 'connexion', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addProduct', component: AddProductComponent,canActivate: [AuthGuard]},
  {path: 'commandeAdress', component: FormulaireCommandeComponent,canActivate: [AuthGuard]},
  {path: 'commandeCreditCard', component:CreditCardInfoComponent,canActivate: [AuthGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormulaireComponent,
    AccueilComponent,
    PanierComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    FormulaireCommandeComponent,
    CreditCardInfoComponent,
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    RouterModule.forRoot (appRoutes),
    NgxsModule.forRoot ([PanierState])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
