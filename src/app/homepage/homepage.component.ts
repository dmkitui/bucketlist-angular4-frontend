import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title = 'Welcome to Bucketlist';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.router.navigate(['/login']);
  }

}
