import { Injectable } from '@angular/core';

import { userList } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUserList() {
    return userList;
  }
}
