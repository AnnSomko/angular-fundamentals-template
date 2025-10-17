import { Component } from '@angular/core';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  constructor(
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.userStore.getUser()
  }
}