import { User } from './User';

export class Pharmacy {
    ID: number;
    name: string;
    Address: string;
    telephone: string;
    Email: string;
    location:Number;
    IsActive:boolean;
    users : User[]
  }