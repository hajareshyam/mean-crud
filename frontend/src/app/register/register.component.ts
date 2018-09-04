import { Component, OnInit,ViewChild , ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  @ViewChild('error') error: ElementRef;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        if(res.error){
          this.error.nativeElement.innerHTML = res.message;
          alert(res.message);
        }else{
          localStorage.setItem('token',res.token);
          this._router.navigate(['/users'])
        }    
      },
      err => console.log(err)
    )      
  }


}