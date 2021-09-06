import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  connectedUser: User;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser')) as User;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/user/login');
  }
}
