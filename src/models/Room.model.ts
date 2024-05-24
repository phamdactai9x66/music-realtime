export interface roomsIf {
  _id: string;
  nameRoom: string;
  password: string;
  users: Array<{ _id: number; fullName: string; image: string }>;
}
