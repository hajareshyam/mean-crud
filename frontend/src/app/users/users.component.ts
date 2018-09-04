import { Component, OnInit ,ViewChild , ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../user.model';
import { $ } from 'protractor';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = []
  @ViewChild('close') close: ElementRef;

  selectedUser : User;
  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.getUsers()
      .subscribe(
        res => this.users = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
  refreshEmployeeList() {
    this._authService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id:string){
    if(confirm('Are you sure to delete this record ?') == true){
      console.log(id);
      this._authService.deleteUser(id).subscribe(res =>{
        this.refreshEmployeeList();
      })
    }   
  }

  onEdit(user: User) {
    this.selectedUser = user;
  }

  onUpdate(User){
    console.log("Clicked on update");
    this._authService.onUpdate(User).subscribe((res) => {
      this.close.nativeElement.click();
    });
  }
}