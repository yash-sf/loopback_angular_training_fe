import { Injectable } from "@angular/core";

import { userList } from "../helpers/constants";
import User from "../helpers/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  getUserList() {
    const userListNew = [...userList];
    return userListNew;
  }

  saveUser(userData: User) {
    let userList = this.getUserList();
    userList = [...userList, userData];
    return userList;
  }
}
