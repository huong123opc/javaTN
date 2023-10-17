import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { JwtResponse } from 'src/app/commons/response/jwt-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  jwtResponse: JwtResponse = JSON.parse(sessionStorage.getItem("jwtToken") || "{}")
  jwtString: string = JSON.parse(sessionStorage.getItem("jwtToken") || "")
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    sessionStorage.removeItem("jwtToken");
    this.router.navigate(['/login']);
  }

}
