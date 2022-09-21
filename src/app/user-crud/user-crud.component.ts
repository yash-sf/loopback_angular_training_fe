import { Component, OnInit } from "@angular/core";
import { UsersList } from "../helpers/constants";
import User from "../helpers/user.interface";
import { UserService } from "../user-service/user.service";
import { userList } from "../helpers/constants";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-crud",
  templateUrl: "./user-crud.component.html",
  styleUrls: ["./user-crud.component.css"],
})
export class UserCrudComponent implements OnInit {
  isDataLoaded: boolean = false;
  usersList: UsersList = [];
  columnNames: string[] = [
    "id",
    "firstName",
    "middleName",
    "lastName",
    "email",
    "phone",
    "role",
    "address",
    "createdOn",
    "modifiedOn",
    "mutate",
  ];
  isEditMode: {[id: string]: boolean} = {};
  oldUserData: {[id: string]: User} = {};
  userRoles: {[id: number]: string} = {
    0: "Super Admin",
    1: "Admin",
    2: "Subscriber",
  };

  userRolesInversed: {[id: string]: number} = {
    "Super Admin": 0,
    Admin: 1,
    Subscriber: 2,
  };

  constructor(
    private userService: UserService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onLoadData() {
    this.usersList = [];
    this.usersList = [...userList];
    this.usersList = this.usersList.map((user) => {
      this.isEditMode[user.id] = false;
      return { ...user };
    });
    this.isDataLoaded = true;
  }

  editUser(id: number) {
    this.isEditMode[id] = true;
    this.oldUserData[id] = {
      ...this.usersList.filter((user) => user.id === id)[0],
    };
  }

  deleteUser(id: number) {
    this.usersList = this.usersList.filter((user) => user.id !== id);
  }

  saveUser(user: User) {
    if (!user.firstName || !user.email || !user.role) {
      this.matSnackBar.open("Name, Email and Role are required", "OK", {
        duration: 5000,
      });
      return;
    }
    this.isEditMode[user.id] = false;
    const indexOfUser = this.usersList.findIndex(
      (_user) => _user.id === user.id
    );
    if (indexOfUser !== -1) {
      this.usersList[indexOfUser] = user;
    }
  }

  cancelEdit(id: number) {
    this.isEditMode[id] = false;
    this.usersList = this.usersList.map((user) => {
      if (user.id === id) return { ...this.oldUserData[id] };
      return user;
    });
  }

  changeRole(event: {value: string}, index: number) {
    this.usersList[index].role = this.userRolesInversed[event.value];
  }
}
