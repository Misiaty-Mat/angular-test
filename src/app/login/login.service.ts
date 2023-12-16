import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() { }

  Login(email: string, password: string) {
    if(email === "admin@gmail.com" && password === "admin") {
      this.isLoggedIn = true;
      this.isAdmin = true;
    } else if(email === "user@gmail.com" && password === "12345") {
      this.isLoggedIn = true;
    }

    return this.isLoggedIn
  }
}
