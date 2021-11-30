export class User {

  id: number;
  name: string;
  email: string;
  password: string;
  roles: string[];

  constructor(id: number, name: string, email: string, password: string, roles: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
