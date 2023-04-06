export interface IUserData {
  user: IUser;
  token: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  age: string;
  favorites: any[];
  bookings: any[];
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
