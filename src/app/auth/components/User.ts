export interface User {
  id?: string;
  name: string;
  surname: string;
  email: string;
  username:string;
  date_of_birth?: number;
  password: string;
  gender?: string;
  assets?: Array<string>;
  role: string;
}
