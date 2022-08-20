import { Component, OnInit } from '@angular/core';
import { UsersList } from '../helpers/constants';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'],
})
export class UserCrudComponent implements OnInit {
  private usersList: UsersList = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onLoadData() {
    this.usersList = this.userService.getUserList();
  }
}
