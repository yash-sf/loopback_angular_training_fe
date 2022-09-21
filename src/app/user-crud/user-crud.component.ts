import { Component, OnInit } from "@angular/core";
import { UsersList } from "../helpers/constants";
import User from "../helpers/user.interface";
import { UserService } from "../user-service/user.service";
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
  isEditMode: any = {};
  oldUserData: any = {};
  userRoles: any = {
    0: "Super Admin",
    1: "Admin",
    2: "Subscriber",
  };

  userRolesInversed: any = {
    "Super Admin": 0,
    Admin: 1,
    Subscriber: 2,
  };

  constructor(
    private userService: UserService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async onLoadData() {
    this.usersList = await (await this.userService.findAll()).data;
    this.isDataLoaded = true;
  }

  editUser(id: number) {
    this.isEditMode[id] = true;
    this.oldUserData[id] = {
      ...this.usersList.filter((user) => user.id === id)[0],
    };
  }

  deleteUser(id: number) {
    this.userService.delete(id).then(() => {
      this.onLoadData();
    });
  }

  saveUser(user: User) {
    if (!user.firstName || !user.email || (!user.role && user.role && user.role === 0)) {
      this.matSnackBar.open("Name, Email and Role are required", "OK", {
        duration: 5000,
      });
      return;
    }
    this.isEditMode[user.id] = false;
    this.userService.update(user.id, user);
  }

  cancelEdit(id: number) {
    this.isEditMode[id] = false;
    this.usersList = this.usersList.map((user) => {
      if (user.id === id) return { ...this.oldUserData[id] };
      return user;
    });
  }

  changeRole(event: any, index: number) {
    this.usersList[index].role = this.userRolesInversed[event.value];
  }
}
