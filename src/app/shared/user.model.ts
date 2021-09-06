export class User {
  userId?: number;
  userName: string;
  fullName: string;
  email: string;
  password: string;

  constructor(userId?: number, userName?: string, fullName?: string, email?: string, password?: string) {
    this.userId = userId;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
