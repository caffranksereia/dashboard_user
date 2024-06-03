export interface Iinfo {
  user:IUser;
  accessToken?: any;
}

export interface IAuth {
  email:string;
  password: string;
}

export interface IUser {
  age:string;
birth_date:string;
cell_phone: string;
cpf: string;
email:string;
id?: string;
name: string;
rg: string;
updateAt:string;
}