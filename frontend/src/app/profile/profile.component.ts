import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  login: string | null = localStorage.getItem('userLogin');
  users: User[] = []

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.auth.getUsers().subscribe(
        (data) => {
          this.users = data
        },
        error => {
          console.warn(error)
        }
      );
    }
  }

}
