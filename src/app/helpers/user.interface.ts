export default interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: number;
  address?: string;
  createdOn: string;
  modifiedOn?: string;
}
