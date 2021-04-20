import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../produits/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : string = "";
  password : string = "";

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  connexion () {
    this.userService.login (this.login,this.password).subscribe (response => {
      if(response.status == 200){
        this.router.navigate(['/produits/catalogue']);
      }
    });
  }
}
