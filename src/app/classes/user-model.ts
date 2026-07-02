export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    mobile: string,
    address: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.address = address;
  }
}
