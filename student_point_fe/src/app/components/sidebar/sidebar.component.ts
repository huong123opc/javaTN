import { Component } from '@angular/core';
import { JwtResponse } from 'src/app/commons/response/jwt-response';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  slug!: string;
  jwtResponse: JwtResponse = JSON.parse(sessionStorage.getItem("jwtToken") || "{}");

  ngOnInit(): void {
  }
}
