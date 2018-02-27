import { UserLogin } from 'um_fiwoo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';




let counter = 0;

@Injectable()
export class UserService {

  /*private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };*/


  userlogin: any = JSON.parse(localStorage.getItem('email'));
  users: any; 

  private userArray: any[];

  constructor() {
   
    // if  (this.userlogin !== undefined) {
    //   this.userlogin = JSON.parse(localStorage.getItem('email'));
    // } else {
      this.userlogin = "user@user.com";  
    // }

   this.users = {
      first: {
        name: (this.userlogin.match(/^([^@]*)@/)[1]),
        picture: 'assets/images/user.png'
      }
    };
  }

  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return Observable.of(this.userArray[counter]);
  }
}

