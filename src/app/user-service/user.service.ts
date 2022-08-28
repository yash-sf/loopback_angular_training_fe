import { Injectable } from "@angular/core";

import { userList } from "../helpers/constants";
import User from "../helpers/user.interface";
import { environment } from "src/environments/environment";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userApiUrl: string = environment.apiUrl + 'users'
  constructor() {}

  async getUserList() { 
    const userList = await axios.get(this.userApiUrl);
    return userList.data;
  }

  async saveUser(userData: User) {
    const createResponse = await axios.post(this.userApiUrl, userData)
    return createResponse;
  }

  async updateUser(userData: User) {
    const updateResponse = await axios.put(`${this.userApiUrl}/${userData.id}`, userData)
    return updateResponse;
  }

  async deleteUser(userId: number) {
    const deleteResponse = await axios.delete(`${this.userApiUrl}/${userId}`)
    return deleteResponse;
  }
}
