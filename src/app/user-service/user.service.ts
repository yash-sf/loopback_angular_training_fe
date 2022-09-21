import { Injectable } from "@angular/core";
import User from "../helpers/user.interface";
import { CrudService } from "../services/crud.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends CrudService<User, number> {
  constructor() { 
    super('users')
   }

  // async getUserList() {
  //   const userList = 
  //   const userList = await axios.get(this.userApiUrl);
  //   return userList.data;
  // }

  // async saveUser(userData: User) {
  //   const createResponse = await axios.post(this.userApiUrl, userData)
  //   return createResponse;
  // }

  // async updateUser(userData: User) {
  //   const updateResponse = await axios.put(`${this.userApiUrl}/${userData.id}`, userData)
  //   return updateResponse;
  // }

  // async deleteUser(userId: number) {
  //   const deleteResponse = await axios.delete(`${this.userApiUrl}/${userId}`)
  //   return deleteResponse;
  // }
}
