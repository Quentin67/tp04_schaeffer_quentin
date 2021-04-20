import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../produits/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  login : string = "";
  password: string = "";
  confirmationPassword: string = "";

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  inscription(){
    if(this.password == this.confirmationPassword){
      this.userService.register(this.login, this.password).subscribe(response => {
        if(response.status == 200){
          this.router.navigate(['/produits/catalogue']);
        }
      })
    }
  }

}
