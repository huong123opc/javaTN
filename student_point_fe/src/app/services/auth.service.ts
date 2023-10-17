import { JwtResponse } from './../commons/response/jwt-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtResponse: JwtResponse = JSON.parse(sessionStorage.getItem('jwtToken') || "{}");

  constructor() { }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getToken() {
    return this.jwtResponse.token;
  }
}
