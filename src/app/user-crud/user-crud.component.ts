import { Component, OnInit } from "@angular/core";
import { UsersList, userList } from "../helpers/constants";
import User from "../helpers/user.interface";
import { UserService } from "../user-service/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

function DateFormatter(target: any, key: string, descriptor: any) {
  let originalObj = descriptor.value;
  descriptor.value = function () {
    originalObj?.apply(this);
    this.usersList = this.usersList.map((element: any) => {
      element.createdOn = new Date(parseInt(element.createdOn) * 1000).toLocaleString()
      return element
    });
  };
}

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

  constructor(
    private userService: UserService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

  @DateFormatter
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
  }

  cancelEdit(id: number) {
    console.log(this.oldUserData);
    this.isEditMode[id] = false;
    this.usersList = this.usersList.map((user) => {
      if (user.id === id) return { ...this.oldUserData[id] };
      return user;
    });
  }
}
