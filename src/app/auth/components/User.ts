export class User {



  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  terms: boolean;

  constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);
  }

}
